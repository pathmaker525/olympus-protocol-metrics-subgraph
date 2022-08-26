// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OHMDAIBondV1__depositorInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getPrincipleValue(): BigInt {
    return this.value0;
  }

  getPayoutRemaining(): BigInt {
    return this.value1;
  }

  getLastBlock(): BigInt {
    return this.value2;
  }

  getVestingPeriod(): BigInt {
    return this.value3;
  }
}

export class OHMDAIBondV1__getDepositorInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  get_principleValue(): BigInt {
    return this.value0;
  }

  get_payoutRemaining(): BigInt {
    return this.value1;
  }

  get_lastBlock(): BigInt {
    return this.value2;
  }

  get_vestingPeriod(): BigInt {
    return this.value3;
  }
}

export class OHMDAIBondV1 extends ethereum.SmartContract {
  static bind(address: Address): OHMDAIBondV1 {
    return new OHMDAIBondV1("OHMDAIBondV1", address);
  }

  DAOShare(): BigInt {
    const result = super.call("DAOShare", "DAOShare():(uint256)", []);

    return result[0].toBigInt();
  }

  try_DAOShare(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("DAOShare", "DAOShare():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  DAOWallet(): Address {
    const result = super.call("DAOWallet", "DAOWallet():(address)", []);

    return result[0].toAddress();
  }

  try_DAOWallet(): ethereum.CallResult<Address> {
    const result = super.tryCall("DAOWallet", "DAOWallet():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  OHM(): Address {
    const result = super.call("OHM", "OHM():(address)", []);

    return result[0].toAddress();
  }

  try_OHM(): ethereum.CallResult<Address> {
    const result = super.tryCall("OHM", "OHM():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondCalculator(): Address {
    const result = super.call("bondCalculator", "bondCalculator():(address)", []);

    return result[0].toAddress();
  }

  try_bondCalculator(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "bondCalculator",
      "bondCalculator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondControlVariable(): BigInt {
    const result = super.call(
      "bondControlVariable",
      "bondControlVariable():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_bondControlVariable(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "bondControlVariable",
      "bondControlVariable():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculateBondInterest(amountToDeposit_: BigInt): BigInt {
    const result = super.call(
      "calculateBondInterest",
      "calculateBondInterest(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(amountToDeposit_)]
    );

    return result[0].toBigInt();
  }

  try_calculateBondInterest(
    amountToDeposit_: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "calculateBondInterest",
      "calculateBondInterest(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(amountToDeposit_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculatePendingPayout(depositor_: Address): BigInt {
    const result = super.call(
      "calculatePendingPayout",
      "calculatePendingPayout(address):(uint256)",
      [ethereum.Value.fromAddress(depositor_)]
    );

    return result[0].toBigInt();
  }

  try_calculatePendingPayout(depositor_: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "calculatePendingPayout",
      "calculatePendingPayout(address):(uint256)",
      [ethereum.Value.fromAddress(depositor_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculatePercentVested(depositor_: Address): BigInt {
    const result = super.call(
      "calculatePercentVested",
      "calculatePercentVested(address):(uint256)",
      [ethereum.Value.fromAddress(depositor_)]
    );

    return result[0].toBigInt();
  }

  try_calculatePercentVested(depositor_: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "calculatePercentVested",
      "calculatePercentVested(address):(uint256)",
      [ethereum.Value.fromAddress(depositor_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculatePremium(): BigInt {
    const result = super.call(
      "calculatePremium",
      "calculatePremium():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_calculatePremium(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "calculatePremium",
      "calculatePremium():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  depositBondPrinciple(amountToDeposit_: BigInt): boolean {
    const result = super.call(
      "depositBondPrinciple",
      "depositBondPrinciple(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(amountToDeposit_)]
    );

    return result[0].toBoolean();
  }

  try_depositBondPrinciple(
    amountToDeposit_: BigInt
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "depositBondPrinciple",
      "depositBondPrinciple(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(amountToDeposit_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  depositBondPrincipleWithPermit(
    amountToDeposit_: BigInt,
    deadline: BigInt,
    v: i32,
    r: Bytes,
    s: Bytes
  ): boolean {
    const result = super.call(
      "depositBondPrincipleWithPermit",
      "depositBondPrincipleWithPermit(uint256,uint256,uint8,bytes32,bytes32):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(amountToDeposit_),
        ethereum.Value.fromUnsignedBigInt(deadline),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );

    return result[0].toBoolean();
  }

  try_depositBondPrincipleWithPermit(
    amountToDeposit_: BigInt,
    deadline: BigInt,
    v: i32,
    r: Bytes,
    s: Bytes
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "depositBondPrincipleWithPermit",
      "depositBondPrincipleWithPermit(uint256,uint256,uint8,bytes32,bytes32):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(amountToDeposit_),
        ethereum.Value.fromUnsignedBigInt(deadline),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(v)),
        ethereum.Value.fromFixedBytes(r),
        ethereum.Value.fromFixedBytes(s)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  depositorInfo(param0: Address): OHMDAIBondV1__depositorInfoResult {
    const result = super.call(
      "depositorInfo",
      "depositorInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new OHMDAIBondV1__depositorInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_depositorInfo(
    param0: Address
  ): ethereum.CallResult<OHMDAIBondV1__depositorInfoResult> {
    const result = super.tryCall(
      "depositorInfo",
      "depositorInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new OHMDAIBondV1__depositorInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  getDepositorInfo(
    depositorAddress_: Address
  ): OHMDAIBondV1__getDepositorInfoResult {
    const result = super.call(
      "getDepositorInfo",
      "getDepositorInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(depositorAddress_)]
    );

    return new OHMDAIBondV1__getDepositorInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_getDepositorInfo(
    depositorAddress_: Address
  ): ethereum.CallResult<OHMDAIBondV1__getDepositorInfoResult> {
    const result = super.tryCall(
      "getDepositorInfo",
      "getDepositorInfo(address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(depositorAddress_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new OHMDAIBondV1__getDepositorInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  initialize(principleToken_: Address, OHM_: Address): boolean {
    const result = super.call(
      "initialize",
      "initialize(address,address):(bool)",
      [
        ethereum.Value.fromAddress(principleToken_),
        ethereum.Value.fromAddress(OHM_)
      ]
    );

    return result[0].toBoolean();
  }

  try_initialize(
    principleToken_: Address,
    OHM_: Address
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "initialize",
      "initialize(address,address):(bool)",
      [
        ethereum.Value.fromAddress(principleToken_),
        ethereum.Value.fromAddress(OHM_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isInitialized(): boolean {
    const result = super.call("isInitialized", "isInitialized():(bool)", []);

    return result[0].toBoolean();
  }

  try_isInitialized(): ethereum.CallResult<boolean> {
    const result = super.tryCall("isInitialized", "isInitialized():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  minPremium(): BigInt {
    const result = super.call("minPremium", "minPremium():(uint256)", []);

    return result[0].toBigInt();
  }

  try_minPremium(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("minPremium", "minPremium():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    const result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    const result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  principleToken(): Address {
    const result = super.call("principleToken", "principleToken():(address)", []);

    return result[0].toAddress();
  }

  try_principleToken(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "principleToken",
      "principleToken():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  redeemBond(): boolean {
    const result = super.call("redeemBond", "redeemBond():(bool)", []);

    return result[0].toBoolean();
  }

  try_redeemBond(): ethereum.CallResult<boolean> {
    const result = super.tryCall("redeemBond", "redeemBond():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setAddresses(
    bondCalculator_: Address,
    treasury_: Address,
    stakingContract_: Address,
    DAOWallet_: Address,
    DAOShare_: BigInt
  ): boolean {
    const result = super.call(
      "setAddresses",
      "setAddresses(address,address,address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(bondCalculator_),
        ethereum.Value.fromAddress(treasury_),
        ethereum.Value.fromAddress(stakingContract_),
        ethereum.Value.fromAddress(DAOWallet_),
        ethereum.Value.fromUnsignedBigInt(DAOShare_)
      ]
    );

    return result[0].toBoolean();
  }

  try_setAddresses(
    bondCalculator_: Address,
    treasury_: Address,
    stakingContract_: Address,
    DAOWallet_: Address,
    DAOShare_: BigInt
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "setAddresses",
      "setAddresses(address,address,address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(bondCalculator_),
        ethereum.Value.fromAddress(treasury_),
        ethereum.Value.fromAddress(stakingContract_),
        ethereum.Value.fromAddress(DAOWallet_),
        ethereum.Value.fromUnsignedBigInt(DAOShare_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setBondTerms(
    bondControlVariable_: BigInt,
    vestingPeriodInBlocks_: BigInt,
    minPremium_: BigInt
  ): boolean {
    const result = super.call(
      "setBondTerms",
      "setBondTerms(uint256,uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(bondControlVariable_),
        ethereum.Value.fromUnsignedBigInt(vestingPeriodInBlocks_),
        ethereum.Value.fromUnsignedBigInt(minPremium_)
      ]
    );

    return result[0].toBoolean();
  }

  try_setBondTerms(
    bondControlVariable_: BigInt,
    vestingPeriodInBlocks_: BigInt,
    minPremium_: BigInt
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "setBondTerms",
      "setBondTerms(uint256,uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(bondControlVariable_),
        ethereum.Value.fromUnsignedBigInt(vestingPeriodInBlocks_),
        ethereum.Value.fromUnsignedBigInt(minPremium_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  stakingContract(): Address {
    const result = super.call(
      "stakingContract",
      "stakingContract():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_stakingContract(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "stakingContract",
      "stakingContract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalDebt(): BigInt {
    const result = super.call("totalDebt", "totalDebt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalDebt(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("totalDebt", "totalDebt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  treasury(): Address {
    const result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    const result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vestingPeriodInBlocks(): BigInt {
    const result = super.call(
      "vestingPeriodInBlocks",
      "vestingPeriodInBlocks():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_vestingPeriodInBlocks(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "vestingPeriodInBlocks",
      "vestingPeriodInBlocks():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class DepositBondPrincipleCall extends ethereum.Call {
  get inputs(): DepositBondPrincipleCall__Inputs {
    return new DepositBondPrincipleCall__Inputs(this);
  }

  get outputs(): DepositBondPrincipleCall__Outputs {
    return new DepositBondPrincipleCall__Outputs(this);
  }
}

export class DepositBondPrincipleCall__Inputs {
  _call: DepositBondPrincipleCall;

  constructor(call: DepositBondPrincipleCall) {
    this._call = call;
  }

  get amountToDeposit_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositBondPrincipleCall__Outputs {
  _call: DepositBondPrincipleCall;

  constructor(call: DepositBondPrincipleCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DepositBondPrincipleWithPermitCall extends ethereum.Call {
  get inputs(): DepositBondPrincipleWithPermitCall__Inputs {
    return new DepositBondPrincipleWithPermitCall__Inputs(this);
  }

  get outputs(): DepositBondPrincipleWithPermitCall__Outputs {
    return new DepositBondPrincipleWithPermitCall__Outputs(this);
  }
}

export class DepositBondPrincipleWithPermitCall__Inputs {
  _call: DepositBondPrincipleWithPermitCall;

  constructor(call: DepositBondPrincipleWithPermitCall) {
    this._call = call;
  }

  get amountToDeposit_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class DepositBondPrincipleWithPermitCall__Outputs {
  _call: DepositBondPrincipleWithPermitCall;

  constructor(call: DepositBondPrincipleWithPermitCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get principleToken_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get OHM_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class RedeemBondCall extends ethereum.Call {
  get inputs(): RedeemBondCall__Inputs {
    return new RedeemBondCall__Inputs(this);
  }

  get outputs(): RedeemBondCall__Outputs {
    return new RedeemBondCall__Outputs(this);
  }
}

export class RedeemBondCall__Inputs {
  _call: RedeemBondCall;

  constructor(call: RedeemBondCall) {
    this._call = call;
  }
}

export class RedeemBondCall__Outputs {
  _call: RedeemBondCall;

  constructor(call: RedeemBondCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetAddressesCall extends ethereum.Call {
  get inputs(): SetAddressesCall__Inputs {
    return new SetAddressesCall__Inputs(this);
  }

  get outputs(): SetAddressesCall__Outputs {
    return new SetAddressesCall__Outputs(this);
  }
}

export class SetAddressesCall__Inputs {
  _call: SetAddressesCall;

  constructor(call: SetAddressesCall) {
    this._call = call;
  }

  get bondCalculator_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get treasury_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get stakingContract_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get DAOWallet_(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get DAOShare_(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class SetAddressesCall__Outputs {
  _call: SetAddressesCall;

  constructor(call: SetAddressesCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetBondTermsCall extends ethereum.Call {
  get inputs(): SetBondTermsCall__Inputs {
    return new SetBondTermsCall__Inputs(this);
  }

  get outputs(): SetBondTermsCall__Outputs {
    return new SetBondTermsCall__Outputs(this);
  }
}

export class SetBondTermsCall__Inputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }

  get bondControlVariable_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get vestingPeriodInBlocks_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get minPremium_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetBondTermsCall__Outputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
