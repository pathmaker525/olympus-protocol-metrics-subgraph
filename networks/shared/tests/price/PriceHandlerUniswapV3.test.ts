import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, createMockedFunction, describe, test } from "matchstick-as/assembly/index";

import { ContractNameLookup } from "../../src/contracts/ContractLookup";
import { PriceLookup, PriceLookupResult } from "../../src/price/PriceHandler";
import { PriceHandlerUniswapV3 } from "../../src/price/PriceHandlerUniswapV3";

const mockRateUniswapV3 = (
  pairAddress: string,
  slot0Value: BigInt,
  token0Address: string,
  token1Address: string,
  token0Decimals: i32,
  token1Decimals: i32,
  token0Balance: BigInt,
  token1Balance: BigInt,
): void => {
  const contractAddress = Address.fromString(pairAddress);
  // slot0
  createMockedFunction(
    contractAddress,
    "slot0",
    "slot0():(uint160,int24,uint16,uint16,uint16,uint8,bool)",
  ).returns([
    ethereum.Value.fromUnsignedBigInt(slot0Value),
    ethereum.Value.fromI32(-57778),
    ethereum.Value.fromI32(1),
    ethereum.Value.fromI32(2),
    ethereum.Value.fromI32(2),
    ethereum.Value.fromI32(0),
    ethereum.Value.fromBoolean(true),
  ]);

  // Tokens
  createMockedFunction(contractAddress, "token0", "token0():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token0Address)),
  ]);
  createMockedFunction(contractAddress, "token1", "token1():(address)").returns([
    ethereum.Value.fromAddress(Address.fromString(token1Address)),
  ]);

  // Token decimals
  createMockedFunction(Address.fromString(token0Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token0Decimals)],
  );
  createMockedFunction(Address.fromString(token1Address), "decimals", "decimals():(uint8)").returns(
    [ethereum.Value.fromI32(token1Decimals)],
  );

  // Balance
  createMockedFunction(
    Address.fromString(token0Address),
    "balanceOf",
    "balanceOf(address):(uint256)",
  )
    .withArgs([ethereum.Value.fromAddress(contractAddress)])
    .returns([ethereum.Value.fromUnsignedBigInt(token0Balance)]);
  createMockedFunction(
    Address.fromString(token1Address),
    "balanceOf",
    "balanceOf(address):(uint256)",
  )
    .withArgs([ethereum.Value.fromAddress(contractAddress)])
    .returns([ethereum.Value.fromUnsignedBigInt(token1Balance)]);
};

const LP_UNISWAP_V3_FPIS_FRAX = "0x8fe536c7dc019455cce34746755c64bbe2aa163b".toLowerCase();
const ERC20_FRAX = "0x853d955acef822db058eb8505911ed77f175b99e".toLowerCase();
const ERC20_FPIS = "0xc2544a32872a91f4a553b404c6950e89de901fdb".toLowerCase();
const SLOT0 = "74413935457348545615865577209"; // Copied from FPIS
const FRAX_BALANCE = "0";
const FPIS_BALANCE = "0";

export const mockFpisFraxPair = (): void => {
  mockRateUniswapV3(
    LP_UNISWAP_V3_FPIS_FRAX,
    BigInt.fromString(SLOT0),
    ERC20_FRAX,
    ERC20_FPIS,
    18,
    18,
    BigInt.fromString(FRAX_BALANCE),
    BigInt.fromString(FPIS_BALANCE),
  );
};

const FPIS_RATE = BigDecimal.fromString("1.13357594386");

describe("UniswapV3 price handler", () => {
  test("when secondary token = $1", () => {
    const stablecoinPriceLookup: PriceLookup = (
      _tokenAddress: string,
      _block: BigInt,
    ): PriceLookupResult => {
      return {
        liquidity: BigDecimal.fromString("1"),
        price: BigDecimal.fromString("1"),
      };
    };

    const contractLookup: ContractNameLookup = (_tokenAddress: string): string => "FPIS";

    mockFpisFraxPair();

    const handler = new PriceHandlerUniswapV3(
      [ERC20_FPIS],
      LP_UNISWAP_V3_FPIS_FRAX,
      contractLookup,
    );

    // Should return the price of FPIS
    const priceResult = handler.getPrice(ERC20_FPIS, stablecoinPriceLookup, BigInt.fromString("1"));
    assert.stringEquals(
      FPIS_RATE.toString(),
      priceResult ? priceResult.price.toString().slice(0, 13) : "",
    );
  });
});
