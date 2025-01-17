// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  BigDecimal,
  BigInt,
  Bytes,
  Entity,
  store,
  TypedMap,
  Value,
  ValueKind} from "@graphprotocol/graph-ts";

export class PriceSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save PriceSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PriceSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PriceSnapshot", id.toString(), this);
    }
  }

  static load(id: string): PriceSnapshot | null {
    return changetype<PriceSnapshot | null>(store.get("PriceSnapshot", id));
  }

  get id(): string {
    const value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get ohmUsdPrice(): BigDecimal {
    const value = this.get("ohmUsdPrice");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmUsdPrice(value: BigDecimal) {
    this.set("ohmUsdPrice", Value.fromBigDecimal(value));
  }

  get ohmUsdPrice1dDelta(): BigDecimal | null {
    const value = this.get("ohmUsdPrice1dDelta");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmUsdPrice1dDelta(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmUsdPrice1dDelta");
    } else {
      this.set("ohmUsdPrice1dDelta", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get ohmUsdPrice30dVolatility(): BigDecimal | null {
    const value = this.get("ohmUsdPrice30dVolatility");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmUsdPrice30dVolatility(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmUsdPrice30dVolatility");
    } else {
      this.set(
        "ohmUsdPrice30dVolatility",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get gOhmUsdPrice(): BigDecimal {
    const value = this.get("gOhmUsdPrice");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set gOhmUsdPrice(value: BigDecimal) {
    this.set("gOhmUsdPrice", Value.fromBigDecimal(value));
  }
}

export class PriceSnapshotDaily extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save PriceSnapshotDaily entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PriceSnapshotDaily must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PriceSnapshotDaily", id.toString(), this);
    }
  }

  static load(id: string): PriceSnapshotDaily | null {
    return changetype<PriceSnapshotDaily | null>(
      store.get("PriceSnapshotDaily", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get record(): string {
    const value = this.get("record");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set record(value: string) {
    this.set("record", Value.fromString(value));
  }
}

export class TokenPriceSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save TokenPriceSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenPriceSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenPriceSnapshot", id.toString(), this);
    }
  }

  static load(id: string): TokenPriceSnapshot | null {
    return changetype<TokenPriceSnapshot | null>(
      store.get("TokenPriceSnapshot", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get token(): Bytes {
    const value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get price(): BigDecimal {
    const value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set price(value: BigDecimal) {
    this.set("price", Value.fromBigDecimal(value));
  }
}
