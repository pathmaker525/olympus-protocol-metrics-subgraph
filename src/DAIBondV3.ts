import { DepositCall } from "../generated/DAIBondV3/DAIBondV3";
import { DAIBOND_TOKEN } from "./utils/Constants";
import { createDailyBondRecord } from "./utils/DailyBond";
import { toDecimal } from "./utils/Decimals";
import { loadOrCreateToken } from "./utils/Tokens";

export function handleDeposit(call: DepositCall): void {
  const token = loadOrCreateToken(DAIBOND_TOKEN);
  const amount = toDecimal(call.inputs._amount, 18);

  createDailyBondRecord(call.block.timestamp, token, amount, amount);
}
