// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EmergencyWithdraw extends ethereum.Event {
  get params(): EmergencyWithdraw__Params {
    return new EmergencyWithdraw__Params(this);
  }
}

export class EmergencyWithdraw__Params {
  _event: EmergencyWithdraw;

  constructor(event: EmergencyWithdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Harvest extends ethereum.Event {
  get params(): Harvest__Params {
    return new Harvest__Params(this);
  }
}

export class Harvest__Params {
  _event: Harvest;

  constructor(event: Harvest) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NewPool extends ethereum.Event {
  get params(): NewPool__Params {
    return new NewPool__Params(this);
  }
}

export class NewPool__Params {
  _event: NewPool;

  constructor(event: NewPool) {
    this._event = event;
  }

  get lp(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newAlloc(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

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

export class PoolUpdate extends ethereum.Event {
  get params(): PoolUpdate__Params {
    return new PoolUpdate__Params(this);
  }
}

export class PoolUpdate__Params {
  _event: PoolUpdate;

  constructor(event: PoolUpdate) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newAlloc(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class SetDevAddress extends ethereum.Event {
  get params(): SetDevAddress__Params {
    return new SetDevAddress__Params(this);
  }
}

export class SetDevAddress__Params {
  _event: SetDevAddress;

  constructor(event: SetDevAddress) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SetFeeAddress extends ethereum.Event {
  get params(): SetFeeAddress__Params {
    return new SetFeeAddress__Params(this);
  }
}

export class SetFeeAddress__Params {
  _event: SetFeeAddress;

  constructor(event: SetFeeAddress) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UpdateEmissionRate extends ethereum.Event {
  get params(): UpdateEmissionRate__Params {
    return new UpdateEmissionRate__Params(this);
  }
}

export class UpdateEmissionRate__Params {
  _event: UpdateEmissionRate;

  constructor(event: UpdateEmissionRate) {
    this._event = event;
  }

  get jonesPerSecond(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class JonesMillinerV2__poolInfoResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getLpToken(): Address {
    return this.value0;
  }

  getAllocPoint(): BigInt {
    return this.value1;
  }

  getLastRewardSecond(): BigInt {
    return this.value2;
  }

  getAccJonesPerShare(): BigInt {
    return this.value3;
  }

  getCurrentDeposit(): BigInt {
    return this.value4;
  }
}

export class JonesMillinerV2__userInfoResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromSignedBigInt(this.value1));
    return map;
  }

  getAmount(): BigInt {
    return this.value0;
  }

  getRewardDebt(): BigInt {
    return this.value1;
  }
}

export class JonesMillinerV2 extends ethereum.SmartContract {
  static bind(address: Address): JonesMillinerV2 {
    return new JonesMillinerV2("JonesMillinerV2", address);
  }

  deposited(_pid: BigInt, _user: Address): BigInt {
    const result = super.call(
      "deposited",
      "deposited(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );

    return result[0].toBigInt();
  }

  try_deposited(_pid: BigInt, _user: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "deposited",
      "deposited(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hatDistributor(): Address {
    const result = super.call("hatDistributor", "hatDistributor():(address)", []);

    return result[0].toAddress();
  }

  try_hatDistributor(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "hatDistributor",
      "hatDistributor():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  jones(): Address {
    const result = super.call("jones", "jones():(address)", []);

    return result[0].toAddress();
  }

  try_jones(): ethereum.CallResult<Address> {
    const result = super.tryCall("jones", "jones():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  jonesPerSecond(): BigInt {
    const result = super.call("jonesPerSecond", "jonesPerSecond():(uint256)", []);

    return result[0].toBigInt();
  }

  try_jonesPerSecond(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "jonesPerSecond",
      "jonesPerSecond():(uint256)",
      []
    );
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

  pendingJones(_pid: BigInt, _user: Address): BigInt {
    const result = super.call(
      "pendingJones",
      "pendingJones(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );

    return result[0].toBigInt();
  }

  try_pendingJones(_pid: BigInt, _user: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "pendingJones",
      "pendingJones(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  poolExistence(param0: Address): boolean {
    const result = super.call("poolExistence", "poolExistence(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_poolExistence(param0: Address): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "poolExistence",
      "poolExistence(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  poolInfo(param0: BigInt): JonesMillinerV2__poolInfoResult {
    const result = super.call(
      "poolInfo",
      "poolInfo(uint256):(address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new JonesMillinerV2__poolInfoResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_poolInfo(
    param0: BigInt
  ): ethereum.CallResult<JonesMillinerV2__poolInfoResult> {
    const result = super.tryCall(
      "poolInfo",
      "poolInfo(uint256):(address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new JonesMillinerV2__poolInfoResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  poolLength(): BigInt {
    const result = super.call("poolLength", "poolLength():(uint256)", []);

    return result[0].toBigInt();
  }

  try_poolLength(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("poolLength", "poolLength():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardManager(): Address {
    const result = super.call("rewardManager", "rewardManager():(address)", []);

    return result[0].toAddress();
  }

  try_rewardManager(): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "rewardManager",
      "rewardManager():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  startTime(): BigInt {
    const result = super.call("startTime", "startTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_startTime(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("startTime", "startTime():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalAllocPoint(): BigInt {
    const result = super.call(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalAllocPoint(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userInfo(param0: BigInt, param1: Address): JonesMillinerV2__userInfoResult {
    const result = super.call(
      "userInfo",
      "userInfo(uint256,address):(uint256,int256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return new JonesMillinerV2__userInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_userInfo(
    param0: BigInt,
    param1: Address
  ): ethereum.CallResult<JonesMillinerV2__userInfoResult> {
    const result = super.tryCall(
      "userInfo",
      "userInfo(uint256,address):(uint256,int256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new JonesMillinerV2__userInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  whitelistedContract(param0: Address): boolean {
    const result = super.call(
      "whitelistedContract",
      "whitelistedContract(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_whitelistedContract(param0: Address): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "whitelistedContract",
      "whitelistedContract(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _jones(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _jonesPerSecond(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _startTime(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _rewardManager(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _hatDistributor(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddCall extends ethereum.Call {
  get inputs(): AddCall__Inputs {
    return new AddCall__Inputs(this);
  }

  get outputs(): AddCall__Outputs {
    return new AddCall__Outputs(this);
  }
}

export class AddCall__Inputs {
  _call: AddCall;

  constructor(call: AddCall) {
    this._call = call;
  }

  get _allocPoint(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _lpToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _withUpdate(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class AddCall__Outputs {
  _call: AddCall;

  constructor(call: AddCall) {
    this._call = call;
  }
}

export class AddContractAddressToWhitelistCall extends ethereum.Call {
  get inputs(): AddContractAddressToWhitelistCall__Inputs {
    return new AddContractAddressToWhitelistCall__Inputs(this);
  }

  get outputs(): AddContractAddressToWhitelistCall__Outputs {
    return new AddContractAddressToWhitelistCall__Outputs(this);
  }
}

export class AddContractAddressToWhitelistCall__Inputs {
  _call: AddContractAddressToWhitelistCall;

  constructor(call: AddContractAddressToWhitelistCall) {
    this._call = call;
  }

  get _contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddContractAddressToWhitelistCall__Outputs {
  _call: AddContractAddressToWhitelistCall;

  constructor(call: AddContractAddressToWhitelistCall) {
    this._call = call;
  }
}

export class CompoundCall extends ethereum.Call {
  get inputs(): CompoundCall__Inputs {
    return new CompoundCall__Inputs(this);
  }

  get outputs(): CompoundCall__Outputs {
    return new CompoundCall__Outputs(this);
  }
}

export class CompoundCall__Inputs {
  _call: CompoundCall;

  constructor(call: CompoundCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CompoundCall__Outputs {
  _call: CompoundCall;

  constructor(call: CompoundCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawCall__Inputs {
    return new EmergencyWithdrawCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawCall__Outputs {
    return new EmergencyWithdrawCall__Outputs(this);
  }
}

export class EmergencyWithdrawCall__Inputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmergencyWithdrawCall__Outputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }
}

export class HarvestCall extends ethereum.Call {
  get inputs(): HarvestCall__Inputs {
    return new HarvestCall__Inputs(this);
  }

  get outputs(): HarvestCall__Outputs {
    return new HarvestCall__Outputs(this);
  }
}

export class HarvestCall__Inputs {
  _call: HarvestCall;

  constructor(call: HarvestCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class HarvestCall__Outputs {
  _call: HarvestCall;

  constructor(call: HarvestCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall extends ethereum.Call {
  get inputs(): MassUpdatePoolsCall__Inputs {
    return new MassUpdatePoolsCall__Inputs(this);
  }

  get outputs(): MassUpdatePoolsCall__Outputs {
    return new MassUpdatePoolsCall__Outputs(this);
  }
}

export class MassUpdatePoolsCall__Inputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall__Outputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
    this._call = call;
  }
}

export class MigrateRewardsCall extends ethereum.Call {
  get inputs(): MigrateRewardsCall__Inputs {
    return new MigrateRewardsCall__Inputs(this);
  }

  get outputs(): MigrateRewardsCall__Outputs {
    return new MigrateRewardsCall__Outputs(this);
  }
}

export class MigrateRewardsCall__Inputs {
  _call: MigrateRewardsCall;

  constructor(call: MigrateRewardsCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class MigrateRewardsCall__Outputs {
  _call: MigrateRewardsCall;

  constructor(call: MigrateRewardsCall) {
    this._call = call;
  }
}

export class RemoveContractAddressFromWhitelistCall extends ethereum.Call {
  get inputs(): RemoveContractAddressFromWhitelistCall__Inputs {
    return new RemoveContractAddressFromWhitelistCall__Inputs(this);
  }

  get outputs(): RemoveContractAddressFromWhitelistCall__Outputs {
    return new RemoveContractAddressFromWhitelistCall__Outputs(this);
  }
}

export class RemoveContractAddressFromWhitelistCall__Inputs {
  _call: RemoveContractAddressFromWhitelistCall;

  constructor(call: RemoveContractAddressFromWhitelistCall) {
    this._call = call;
  }

  get _contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveContractAddressFromWhitelistCall__Outputs {
  _call: RemoveContractAddressFromWhitelistCall;

  constructor(call: RemoveContractAddressFromWhitelistCall) {
    this._call = call;
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

export class SetCall extends ethereum.Call {
  get inputs(): SetCall__Inputs {
    return new SetCall__Inputs(this);
  }

  get outputs(): SetCall__Outputs {
    return new SetCall__Outputs(this);
  }
}

export class SetCall__Inputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _allocPoint(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _withUpdate(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetCall__Outputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
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

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateEmissionRateCall extends ethereum.Call {
  get inputs(): UpdateEmissionRateCall__Inputs {
    return new UpdateEmissionRateCall__Inputs(this);
  }

  get outputs(): UpdateEmissionRateCall__Outputs {
    return new UpdateEmissionRateCall__Outputs(this);
  }
}

export class UpdateEmissionRateCall__Inputs {
  _call: UpdateEmissionRateCall;

  constructor(call: UpdateEmissionRateCall) {
    this._call = call;
  }

  get _jonesPerSecond(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateEmissionRateCall__Outputs {
  _call: UpdateEmissionRateCall;

  constructor(call: UpdateEmissionRateCall) {
    this._call = call;
  }
}

export class UpdateHatDistributorCall extends ethereum.Call {
  get inputs(): UpdateHatDistributorCall__Inputs {
    return new UpdateHatDistributorCall__Inputs(this);
  }

  get outputs(): UpdateHatDistributorCall__Outputs {
    return new UpdateHatDistributorCall__Outputs(this);
  }
}

export class UpdateHatDistributorCall__Inputs {
  _call: UpdateHatDistributorCall;

  constructor(call: UpdateHatDistributorCall) {
    this._call = call;
  }

  get _distributor(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateHatDistributorCall__Outputs {
  _call: UpdateHatDistributorCall;

  constructor(call: UpdateHatDistributorCall) {
    this._call = call;
  }
}

export class UpdatePoolCall extends ethereum.Call {
  get inputs(): UpdatePoolCall__Inputs {
    return new UpdatePoolCall__Inputs(this);
  }

  get outputs(): UpdatePoolCall__Outputs {
    return new UpdatePoolCall__Outputs(this);
  }
}

export class UpdatePoolCall__Inputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePoolCall__Outputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
    this._call = call;
  }
}

export class UpdateRewardsManagerCall extends ethereum.Call {
  get inputs(): UpdateRewardsManagerCall__Inputs {
    return new UpdateRewardsManagerCall__Inputs(this);
  }

  get outputs(): UpdateRewardsManagerCall__Outputs {
    return new UpdateRewardsManagerCall__Outputs(this);
  }
}

export class UpdateRewardsManagerCall__Inputs {
  _call: UpdateRewardsManagerCall;

  constructor(call: UpdateRewardsManagerCall) {
    this._call = call;
  }

  get _newManager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateRewardsManagerCall__Outputs {
  _call: UpdateRewardsManagerCall;

  constructor(call: UpdateRewardsManagerCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
