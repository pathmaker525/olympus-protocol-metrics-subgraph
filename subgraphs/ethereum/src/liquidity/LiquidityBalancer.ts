import { Address, BigDecimal, BigInt, Bytes, log } from "@graphprotocol/graph-ts";

import { TokenRecord } from "../../../shared/generated/schema";
import { TokenCategoryPOL } from "../../../shared/src/contracts/TokenDefinition";
import { pushArray } from "../../../shared/src/utils/ArrayHelper";
import { toDecimal } from "../../../shared/src/utils/Decimals";
import { createOrUpdateTokenRecord } from "../../../shared/src/utils/TokenRecordHelper";
import { ERC20 } from "../../generated/PriceSnapshot/ERC20";
import { BalancerPoolToken } from "../../generated/ProtocolMetrics/BalancerPoolToken";
import { BalancerVault } from "../../generated/ProtocolMetrics/BalancerVault";
import { BalancerPoolSnapshot, TokenSupply } from "../../generated/schema";
import { getERC20Decimals, getOrCreateERC20TokenSnapshot } from "../contracts/ERC20";
import {
  BLOCKCHAIN,
  ERC20_OHM_V2,
  ERC20_TOKENS,
  getContractName,
  getWalletAddressesForContract,
  liquidityPairHasToken,
} from "../utils/Constants";
import {
  getAuraStakedBalancesFromWallets,
  getBalancerGaugeBalancesFromWallets,
  getERC20,
} from "../utils/ContractHelper";
import { getUSDRate } from "../utils/Price";
import { createOrUpdateTokenSupply, TYPE_LIQUIDITY } from "../utils/TokenSupplyHelper";

const balancerVaultMap = new Map<string, BalancerVault>();

export function getBalancerVault(vaultAddress: string, _blockNumber: BigInt): BalancerVault {
  const vaultAddressLower = vaultAddress.toLowerCase();

  if (!balancerVaultMap.has(vaultAddressLower)) {
    const contract = BalancerVault.bind(Address.fromString(vaultAddressLower));
    balancerVaultMap.set(vaultAddressLower, contract);
  }

  return balancerVaultMap.get(vaultAddressLower);
}

function getOrCreateBalancerPoolSnapshot(poolId: string, vaultAddress: string, blockNumber: BigInt): BalancerPoolSnapshot {
  const snapshotId = `${poolId}/${blockNumber.toString()}`;
  let snapshot = BalancerPoolSnapshot.load(snapshotId);
  if (snapshot == null) {
    snapshot = new BalancerPoolSnapshot(snapshotId);
    snapshot.block = blockNumber;
    snapshot.pool = Bytes.fromHexString(poolId);

    const vault = getBalancerVault(vaultAddress, blockNumber);
    const tokenWrapper = vault.getPoolTokens(Bytes.fromHexString(poolId));
    const addresses: Address[] = tokenWrapper.getTokens();
    snapshot.tokens = changetype<Bytes[]>(addresses);

    const balances: BigInt[] = tokenWrapper.getBalances();
    const snapshotBalances: BigDecimal[] = [];
    for (let i = 0; i < balances.length; i++) {
      const snapshotToken: Address = addresses[i];
      const tokenDecimals: number = getERC20Decimals(snapshotToken.toHexString(), blockNumber);
      snapshotBalances.push(toDecimal(balances[i], tokenDecimals));
    }
    snapshot.balances = snapshotBalances;

    const poolInfo = vault.getPool(Bytes.fromHexString(poolId));
    snapshot.poolToken = poolInfo.getValue0();

    const poolTokenContract = getOrCreateERC20TokenSnapshot(snapshot.poolToken.toHexString(), blockNumber);
    snapshot.decimals = poolTokenContract.decimals;
    snapshot.totalSupply = poolTokenContract.totalSupply;
    snapshot.save();
  }

  return snapshot;
}

// ### Balances for liquidity ###

/**
 * Determines the total value of the specified Balancer pool, specified by {poolId}.
 *
 * The value is the sum of rate * balance for all tokens.
 *
 * @param vaultAddress The address of the Balancer vault
 * @param poolId The pool id, as returned by `getPool()` on the allocator contract
 * @param excludeOhmValue If true, the value will exclude OHM. This can be used to calculate backing
 * @param blockNumber the current block number
 * @returns BigDecimal
 */
export function getBalancerPoolTotalValue(
  vaultAddress: string,
  poolId: string,
  excludeOhmValue: boolean,
  blockNumber: BigInt,
): BigDecimal {
  const poolSnapshot = getOrCreateBalancerPoolSnapshot(poolId, vaultAddress, blockNumber);
  const addresses: Array<Bytes> = poolSnapshot.tokens;
  const balances: Array<BigDecimal> = poolSnapshot.balances;

  // Total value is sum of (rate * balance)
  let totalValue = BigDecimal.zero();

  for (let i = 0; i < addresses.length; i++) {
    const currentAddress = addresses[i].toHexString();

    if (excludeOhmValue && currentAddress.toLowerCase() == ERC20_OHM_V2.toLowerCase()) {
      log.debug("getBalancerPoolTotalValue: Skipping OHM as excludeOhmValue is true", []);
      continue;
    }

    // Add to the value: rate * balance
    const currentBalanceDecimal = balances[i];
    const rate = getUSDRate(currentAddress, blockNumber);
    const value = currentBalanceDecimal.times(rate);
    log.debug("Token address: {}, balance: {}, rate: {}, value: {}", [
      currentAddress,
      currentBalanceDecimal.toString(),
      rate.toString(),
      value.toString(),
    ]);

    totalValue = totalValue.plus(value);
  }

  return totalValue;
}

/**
 * Determines the unit rate of the given Balancer pool.
 *
 * Unit rate = total value / total supply
 *
 * @param poolTokenContract
 * @param totalValue
 * @param blockNumber
 * @returns
 */
function getBalancerPoolUnitRate(
  vaultAddress: string,
  poolId: string,
  totalValue: BigDecimal,
  blockNumber: BigInt,
): BigDecimal {
  const poolSnapshot = getOrCreateBalancerPoolSnapshot(poolId, vaultAddress, blockNumber);

  return totalValue.div(poolSnapshot.totalSupply);
}

const balancerPoolTokenMap = new Map<string, BalancerPoolToken>();

export function getBalancerPoolToken(
  vaultAddress: string,
  poolId: string,
  blockNumber: BigInt,
): BalancerPoolToken | null {
  const vault = getBalancerVault(vaultAddress, blockNumber);
  // Will trigger if at an earlier block
  if (vault.try_getPool(Bytes.fromHexString(poolId)).reverted) {
    return null;
  }
  const poolInfo = vault.getPool(Bytes.fromHexString(poolId));
  const poolToken = poolInfo.getValue0().toHexString();

  const poolTokenLower = poolToken.toLowerCase();
  if (!balancerPoolTokenMap.has(poolTokenLower)) {
    const contract = BalancerPoolToken.bind(Address.fromString(poolTokenLower));
    balancerPoolTokenMap.set(poolTokenLower, contract);
  }

  return balancerPoolTokenMap.get(poolTokenLower);
}

/**
 * Helper method to simplify getting the balance from a BalancerPoolToken contract.
 *
 * Returns 0 if the minimum block number has not passed.
 *
 * @param contract The bound BalancerPoolToken contract.
 * @param walletAddress The address of the holder.
 * @param blockNumber The current block number.
 * @returns BigDecimal
 */
function getBalancerPoolTokenBalance(
  contractAddress: string,
  walletAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  const contractSnapshot = getOrCreateERC20TokenSnapshot(contractAddress, blockNumber);
  const contract = ERC20.bind(Address.fromString(contractAddress));
  const balance = contract.balanceOf(Address.fromString(walletAddress));
  const balanceDecimals = toDecimal(balance, contractSnapshot.decimals);
  log.debug(
    "getBalancerPoolTokenBalance: Found balance {} in ERC20 contract {} ({}) for wallet {} ({}) at block number {}",
    [
      balanceDecimals.toString(),
      getContractName(contractAddress),
      contractAddress,
      getContractName(walletAddress),
      walletAddress,
      blockNumber.toString(),
    ],
  );

  return balanceDecimals;
}

function getBalancerPoolTokenRecords(
  timestamp: BigInt,
  vaultAddress: string,
  poolId: string,
  unitRate: BigDecimal,
  multiplier: BigDecimal,
  blockNumber: BigInt,
): TokenRecord[] {
  const records: TokenRecord[] = [];

  const wallets = getWalletAddressesForContract(poolId);
  const poolSnapshot = getOrCreateBalancerPoolSnapshot(poolId, vaultAddress, blockNumber);
  const poolTokenAddress = poolSnapshot.poolToken.toHexString();

  for (let i = 0; i < wallets.length; i++) {
    const walletAddress = wallets[i];
    const balance = getBalancerPoolTokenBalance(poolSnapshot.poolToken.toHexString(), walletAddress, blockNumber);
    if (balance.equals(BigDecimal.zero())) continue;

    log.info(
      "getBalancerPoolTokenRecordsWrapper: Balancer pool {} has balance of {} in wallet {}",
      [getContractName(poolTokenAddress), balance.toString(), getContractName(walletAddress)],
    );
    records.push(
      createOrUpdateTokenRecord(
        timestamp,
        getContractName(poolTokenAddress),
        poolTokenAddress,
        getContractName(walletAddress),
        walletAddress,
        unitRate,
        balance,
        blockNumber,
        true,
        ERC20_TOKENS,
        BLOCKCHAIN,
        multiplier,
        TokenCategoryPOL,
      ),
    );
  }

  return records;
}

/**
 * Provides TokenRecord array representing the Balancer pool identified by {poolId}.
 *
 * @param metricName
 * @param vaultAddress The address of the Balancer Vault
 * @param poolId The id of the Balancer pool
 * @param blockNumber The current block number
 * @param tokenAddress If specified, this function will exit if the token is not in the liquidity pool
 * @returns
 */
export function getBalancerRecords(
  timestamp: BigInt,
  vaultAddress: string,
  poolId: string,
  blockNumber: BigInt,
  tokenAddress: string | null = null,
): TokenRecord[] {
  log.info("getBalancerRecords: Calculating value of Balancer vault {} for pool id {}", [
    vaultAddress,
    poolId,
  ]);
  const records: TokenRecord[] = [];
  if (tokenAddress && !liquidityPairHasToken(poolId, tokenAddress)) {
    log.debug(
      "getBalancerRecords: tokenAddress {} ({}) specified and not found in balancer pool. Skipping.",
      [getContractName(tokenAddress), tokenAddress],
    );
    return records;
  }

  const poolSnapshot = getOrCreateBalancerPoolSnapshot(poolId, vaultAddress, blockNumber);
  if (poolSnapshot.totalSupply.equals(BigDecimal.zero())) {
    log.debug("getBalancerRecords: Skipping Balancer pool {} with total supply of 0 at block {}", [
      getContractName(poolId),
      blockNumber.toString(),
    ]);
    return records;
  }

  // Calculate the value of the pool
  const totalValue = getBalancerPoolTotalValue(vaultAddress, poolId, false, blockNumber);
  const includedValue = getBalancerPoolTotalValue(vaultAddress, poolId, true, blockNumber);

  // Calculate the unit rate
  const unitRate = getBalancerPoolUnitRate(vaultAddress, poolId, totalValue, blockNumber);

  // Calculate multiplier
  const multiplier = includedValue.div(totalValue);
  log.info("getBalancerRecords: applying nonOhm multiplier of {}", [multiplier.toString()]);

  const poolTokenAddress = poolSnapshot.poolToken.toHexString();
  log.info(
    "getBalancerRecords: Balancer pool {} ({}) has total value of {}, included value of {} and unit rate of {}",
    [
      getContractName(poolTokenAddress),
      poolTokenAddress,
      totalValue.toString(),
      includedValue.toString(),
      unitRate.toString(),
    ],
  );

  // Standard pool tokens
  pushArray(
    records,
    getBalancerPoolTokenRecords(
      timestamp,
      vaultAddress,
      poolId,
      unitRate,
      multiplier,
      blockNumber,
    ),
  );

  // Pool tokens deposited in a liquidity gauge
  pushArray(
    records,
    getBalancerGaugeBalancesFromWallets(
      timestamp,
      poolTokenAddress,
      unitRate,
      multiplier,
      blockNumber,
    ),
  );

  // Pool tokens staked in AURA
  pushArray(
    records,
    getAuraStakedBalancesFromWallets(
      timestamp,
      poolTokenAddress,
      unitRate,
      multiplier,
      blockNumber,
    ),
  );

  return records;
}

// ### Token quantity for floating supply ###

/**
 * Returns the total quantity of the token {tokenAddress}
 * in the specified Balancer pool.
 *
 * @param vaultAddress Balancer Vault address
 * @param poolId Balancer Pool ID
 * @param tokenAddress The ERC20 token to determine the quantity of
 * @param blockNumber current block number
 * @returns BigDecimal representing the total quantity of the token
 */
export function getBalancerPoolTotalTokenQuantity(
  vaultAddress: string,
  poolId: string,
  tokenAddress: string,
  blockNumber: BigInt,
): BigDecimal {
  const vault = getBalancerVault(vaultAddress, blockNumber);
  const poolTokenWrapper = vault.getPoolTokens(Bytes.fromHexString(poolId));
  const addresses: Array<Address> = poolTokenWrapper.getTokens();
  const balances: Array<BigInt> = poolTokenWrapper.getBalances();

  let tokenQuantity = BigDecimal.zero();

  for (let i = 0; i < addresses.length; i++) {
    const currentAddress = addresses[i].toHexString();
    if (!Address.fromString(currentAddress).equals(Address.fromString(tokenAddress))) continue;

    const currentContract = getERC20(currentAddress, blockNumber);
    if (!currentContract) {
      throw new Error("Unable to bind to ERC20 contract for address " + currentAddress.toString());
    }

    // Add to the value: rate * balance
    const currentBalanceDecimal = toDecimal(balances[i], currentContract.decimals());
    tokenQuantity = tokenQuantity.plus(currentBalanceDecimal);
  }

  return tokenQuantity;
}

/**
 * Returns token records reflecting the quantity of the token {tokenAddress}
 * in the specified Balancer pool across wallets ({getWalletAddressesForContract}).
 *
 * @param metricName
 * @param vaultAddress
 * @param poolId
 * @param tokenAddress
 * @param blockNumber
 * @returns
 */
export function getBalancerPoolTokenQuantity(
  timestamp: BigInt,
  vaultAddress: string,
  poolId: string,
  tokenAddress: string,
  blockNumber: BigInt,
): TokenSupply[] {
  log.info("Calculating quantity of token {} in Balancer vault {} for id {}", [
    getContractName(tokenAddress),
    vaultAddress,
    poolId,
  ]);
  const records: TokenSupply[] = [];
  const poolTokenContract = getBalancerPoolToken(vaultAddress, poolId, blockNumber);
  if (poolTokenContract === null) {
    return records;
  }

  // Calculate the token quantity for the pool
  const totalQuantity = getBalancerPoolTotalTokenQuantity(
    vaultAddress,
    poolId,
    tokenAddress,
    blockNumber,
  );

  const poolTokenAddress = poolTokenContract._address.toHexString();
  const tokenDecimals = poolTokenContract.decimals();
  log.info("Balancer pool {} has total quantity of {}", [
    getContractName(poolTokenAddress),
    totalQuantity.toString(),
  ]);
  const poolTokenTotalSupply = toDecimal(poolTokenContract.totalSupply(), tokenDecimals);

  // Grab balances
  const poolTokenBalances = getBalancerRecords(
    timestamp,
    vaultAddress,
    poolId,
    blockNumber,
    tokenAddress,
  );

  for (let i = 0; i < poolTokenBalances.length; i++) {
    const record = poolTokenBalances[i];

    const tokenBalance = totalQuantity.times(record.balance).div(poolTokenTotalSupply);
    records.push(
      createOrUpdateTokenSupply(
        timestamp,
        getContractName(tokenAddress),
        tokenAddress,
        getContractName(poolTokenAddress),
        poolTokenAddress,
        record.source,
        record.sourceAddress,
        TYPE_LIQUIDITY,
        tokenBalance,
        blockNumber,
        -1,
      ),
    );
  }

  return records;
}
