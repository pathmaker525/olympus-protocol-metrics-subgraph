import { getOhmPrice, getTestBlock, getTokenRecords, getTokenSupplies } from "../../subgraph";
import {
  combineOutput,
  compareLiquidBackingRecords,
  compareMarketValueRecords,
  doLiquidBackingCheck,
  doMarketValueCheck,
} from "./compare";
import { readComparisonFile, writeComparisonFile } from "./results";

/**
 * Fetches the latest block for the given subgraphId, and writes it to ${COMPARISON_FILE}.
 *
 * @param subgraphId
 * @param comparisonFile
 */
export const doLatestBlock = (network: string, subgraphId: string, outputPath: string): void => {
  const comparisonFile = readComparisonFile(outputPath);

  getTestBlock(subgraphId).then((latestBlock: string) => {
    comparisonFile.latestBlock = latestBlock;
    writeComparisonFile(comparisonFile, outputPath);
  });
};

export const doQuery = (
  network: string,
  subgraphId: string,
  branch: string,
  outputPath: string,
): void => {
  const comparisonFile = readComparisonFile(outputPath);

  getTokenRecords(subgraphId, comparisonFile.latestBlock).then((tokenRecords) => {
    // Update the comparison results and write
    comparisonFile.branches[branch] = {
      subgraphId: subgraphId,
    };

    comparisonFile.records.tokenRecords[branch] = tokenRecords;

    writeComparisonFile(comparisonFile, outputPath);
  });
};

export const doComparison = (network: string, outputPath: string): void => {
  const comparisonFile = readComparisonFile(outputPath);

  // Read TokenRecord files, parse into JSON
  const baseRecords = comparisonFile.records.tokenRecords.base;
  const branchRecords = comparisonFile.records.tokenRecords.branch;

  compareMarketValueRecords(baseRecords, branchRecords, comparisonFile);
  compareLiquidBackingRecords(baseRecords, branchRecords, comparisonFile);

  // Get TokenSupply and OHM price
  const subgraphId = comparisonFile.branches.branch.subgraphId;
  const block = comparisonFile.latestBlock;
  getTokenSupplies(subgraphId, block).then((branchTokenSupplies) => {
    getOhmPrice(subgraphId, block).then((ohmPrice) => {
      doLiquidBackingCheck(branchRecords, branchTokenSupplies, ohmPrice, comparisonFile);
      doMarketValueCheck(branchRecords, comparisonFile);
      combineOutput(network, comparisonFile);

      writeComparisonFile(comparisonFile, outputPath);
    });
  });
};
