import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { UniswapV2Pair } from "../../generated/Price/UniswapV2Pair";
import { ContractNameLookup } from "../contracts/ContractLookup";
import { getDecimals } from "../contracts/ERC20";
import { arrayIncludesLoose } from "../utils/ArrayHelper";
import { toDecimal } from "../utils/Decimals";
import { addressesEqual } from "../utils/StringHelper";
import { PriceHandler, PriceLookup, PriceLookupResult } from "./PriceHandler";

const CLASS = "PriceHandlerUniswapV2";

export class PriceHandlerUniswapV2 implements PriceHandler {
  protected tokens: string[];
  protected poolAddress: string;
  protected contractLookup: ContractNameLookup;

  constructor(tokens: string[], poolAddress: string, contractLookup: ContractNameLookup) {
    this.tokens = tokens;
    this.poolAddress = poolAddress;
    this.contractLookup = contractLookup;
  }

  getId(): string {
    return this.poolAddress;
  }

  matches(tokenAddress: string): boolean {
    return arrayIncludesLoose(this.tokens, tokenAddress);
  }

  getPrice(
    tokenAddress: string,
    priceLookup: PriceLookup,
    block: BigInt,
  ): PriceLookupResult | null {
    const FUNCTION = `${CLASS}: lookup:`;

    const pair = UniswapV2Pair.bind(Address.fromString(this.poolAddress));
    if (pair === null || pair.try_token0().reverted || pair.try_token1().reverted) {
      log.debug("{} Cannot determine value as the contract ({}) reverted at block {}", [
        FUNCTION,
        this.contractLookup(this.poolAddress),
        block.toString(),
      ]);
      return null;
    }

    // Determine orientation of the pair
    const token0 = pair.token0();
    const token1 = pair.token1();

    if (
      !addressesEqual(tokenAddress, token0.toHexString()) &&
      !addressesEqual(tokenAddress, token1.toHexString())
    ) {
      throw new Error(
        `${FUNCTION} token ${this.contractLookup(
          tokenAddress,
        )} (${tokenAddress}) does not belong to LP ${this.contractLookup(this.poolAddress)} (${
          this.poolAddress
        })`,
      );
    }

    const token0Decimals = getDecimals(token0.toHexString(), block);
    const token1Decimals = getDecimals(token1.toHexString(), block);

    const token0Reserves = toDecimal(pair.getReserves().value0, token0Decimals);
    const token1Reserves = toDecimal(pair.getReserves().value1, token1Decimals);

    const secondaryToken = addressesEqual(tokenAddress, token0.toHexString())
      ? token1.toHexString()
      : token0.toHexString();
    const secondaryTokenPrice = priceLookup(secondaryToken, block);
    if (!secondaryTokenPrice) {
      return null;
    }

    /**
     * reserves(A)
     * -----         * price (A) = price (B)
     * reserves(B)
     */
    // Get the number of tokens denominated in the secondary token
    const baseTokenNumerator = addressesEqual(tokenAddress, token0.toHexString())
      ? token1Reserves.div(token0Reserves)
      : token0Reserves.div(token1Reserves);

    const tokenPrice = baseTokenNumerator.times(secondaryTokenPrice.price);

    return {
      price: tokenPrice,
      liquidity: BigDecimal.zero(), // TODO set liquidity
    };
  }
}
