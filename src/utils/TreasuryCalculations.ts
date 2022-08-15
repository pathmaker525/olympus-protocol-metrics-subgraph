import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { TokenRecordsWrapper } from "../../generated/schema";
import { getOwnedLiquidityPoolValue } from "./LiquidityCalculations";
import {
  getCirculatingSupply,
  getCurrentIndex,
  getFloatingSupply,
  getTotalSupply,
} from "./OhmCalculations";
import { combineTokenRecordsWrapper, newTokenRecordsWrapper } from "./TokenRecordHelper";
import { getStablecoinBalances, getStableValue } from "./TokenStablecoins";
import { getVolatileTokenBalances } from "./TokenVolatile";

/**
 * Returns the value of all volatile tokens, excluding protocol-owned liquidity.
 *
 * As this is a backing metric, the value of OHM is excluded.
 *
 * @param blockNumber the current block number
 * @returns TokenRecordsWrapper object
 */
export function getTreasuryVolatileBacking(
  date: string,
  blockNumber: BigInt,
  liquidOnly: boolean,
): TokenRecordsWrapper {
  return getVolatileTokenBalances(date, liquidOnly, false, true, false, true, true, blockNumber);
}

/**
 * Returns the value of the stable backing, excluding protocol-owned liquidity.
 *
 * As this is a backing metric, the value of OHM is excluded.
 *
 * @param blockNumber the current block number
 * @returns TokenRecordsWrapper object
 */
export function getTreasuryStableBacking(
  metricName: string,
  blockNumber: BigInt,
): TokenRecordsWrapper {
  const records = getStablecoinBalances(metricName, false, false, true, true, blockNumber);

  return records;
}

/**
 * Returns the value of the backing of protocol owned liquidity.
 *
 * As this is a backing metric, the value of OHM is excluded.
 *
 * @param metricName
 * @param blockNumber
 * @returns
 */
export function getTreasuryProtocolOwnedLiquidityBacking(
  metricName: string,
  blockNumber: BigInt,
): TokenRecordsWrapper {
  const records = getOwnedLiquidityPoolValue(metricName, false, true, blockNumber);

  return records;
}

/**
 * Returns the value of the treasury backing
 * - add: getTreasuryStableBacking
 * - add: getTreasuryVolatileBacking
 * - add: getOwnedLiquidityPoolValue (excluding OHM)
 *
 * If {liquidOnly} is true, only liquid assets will be returned.
 *
 * NOTE: previously, this value subtracted the quantity of OHM circulating supply
 * (assuming 1 OHM = $1), which has since been changed (June 2022).
 *
 * @param blockNumber the current block number
 * @returns TokenRecordsWrapper object
 */
export function getTreasuryBacking(
  metricName: string,
  liquidOnly: boolean,
  blockNumber: BigInt,
): TokenRecordsWrapper {
  const records = newTokenRecordsWrapper(metricName, blockNumber);
  const includeLiquidity = true;
  const riskFree = false;
  const excludeOhmValue = true;
  const restrictToTokenValue = true;

  combineTokenRecordsWrapper(
    records,
    getStablecoinBalances(
      metricName,
      includeLiquidity,
      riskFree,
      excludeOhmValue,
      restrictToTokenValue,
      blockNumber,
    ),
  );
  combineTokenRecordsWrapper(
    records,
    getVolatileTokenBalances(
      metricName,
      liquidOnly,
      includeLiquidity,
      true,
      riskFree,
      excludeOhmValue,
      restrictToTokenValue,
      blockNumber,
    ),
  );
  combineTokenRecordsWrapper(
    records,
    getOwnedLiquidityPoolValue(metricName, riskFree, true, blockNumber),
  );

  return records;
}

/**
 * Liquid backing per gOHM is synthetically calculated as:
 *
 * liquid backing * current index / OHM floating supply
 *
 * @param blockNumber
 * @returns
 */
export function getTreasuryLiquidBackingPerGOhm(
  metricName: string,
  blockNumber: BigInt,
): BigDecimal {
  return getTreasuryBacking(metricName, true, blockNumber)
    .value.times(getCurrentIndex(blockNumber))
    .div(getFloatingSupply(metricName, getTotalSupply(blockNumber), blockNumber).value);
}

/**
 * Returns the liquid backing per circulating OHM, equal to:
 *
 * liquid backing / OHM circulating supply
 * {getTreasuryTotalBacking} / {getCirculatingSupply}
 *
 * @param blockNumber
 * @returns
 */
export function getTreasuryLiquidBackingPerOhmCirculating(
  metricName: string,
  blockNumber: BigInt,
): BigDecimal {
  return getTreasuryBacking(metricName, true, blockNumber).value.div(
    getCirculatingSupply(metricName, blockNumber, getTotalSupply(blockNumber)).value,
  );
}

/**
 * Returns the liquid backing per floating OHM, equal to:
 *
 * liquid backing / OHM floating supply
 * {getTreasuryTotalBacking} / {getFloatingSupply}
 *
 * @param blockNumber
 * @returns
 */
export function getTreasuryLiquidBackingPerOhmFloating(
  metricName: string,
  blockNumber: BigInt,
): BigDecimal {
  return getTreasuryBacking(metricName, true, blockNumber).value.div(
    getFloatingSupply(metricName, getTotalSupply(blockNumber), blockNumber).value,
  );
}

/**
 * Returns the market value, which is composed of:
 * - stable value (getStableValue)
 * - volatile value (getVolatileValue)
 * - protocol-owned liquidity value (getOwnedLiquidityPoolValue)
 *
 * Market value does not exclude the value of OHM in the treasury.
 *
 * @param blockNumber
 * @returns
 */
export function getMarketValue(metricName: string, blockNumber: BigInt): TokenRecordsWrapper {
  log.info("Calculating market value", []);
  const records = newTokenRecordsWrapper(metricName, blockNumber);

  // Stable and volatile without protocol-owned liquidity
  combineTokenRecordsWrapper(records, getStableValue(metricName, blockNumber));
  combineTokenRecordsWrapper(
    records,
    getVolatileTokenBalances(metricName, false, false, true, false, false, false, blockNumber),
  );
  // Protocol-owned liquidity
  combineTokenRecordsWrapper(
    records,
    getOwnedLiquidityPoolValue(metricName, false, false, blockNumber),
  );

  log.info("Market value: {}", [records.value.toString()]);
  return records;
}

/**
 * Returns the risk-free value, which is composed of:
 * - stable value (getStableValue)
 * - risk-free value of liquidity pools (getLiquidityPoolValue)
 *
 * @param blockNumber
 * @returns
 */
export function getRiskFreeValue(metricName: string, blockNumber: BigInt): TokenRecordsWrapper {
  log.info("Calculating risk-free value", []);
  const records = newTokenRecordsWrapper(metricName, blockNumber);

  combineTokenRecordsWrapper(records, getStableValue(metricName, blockNumber));
  combineTokenRecordsWrapper(
    records,
    getOwnedLiquidityPoolValue(metricName, true, true, blockNumber),
  );

  log.info("Risk-free value: {}", [records.value.toString()]);
  return records;
}
