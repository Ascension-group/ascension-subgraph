// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("balance", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("votes", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("stakedBalance", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("stakedVotes", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balance(): BigDecimal {
    let value = this.get("balance");
    return value!.toBigDecimal();
  }

  set balance(value: BigDecimal) {
    this.set("balance", Value.fromBigDecimal(value));
  }

  get votes(): BigDecimal {
    let value = this.get("votes");
    return value!.toBigDecimal();
  }

  set votes(value: BigDecimal) {
    this.set("votes", Value.fromBigDecimal(value));
  }

  get stakedBalance(): BigDecimal {
    let value = this.get("stakedBalance");
    return value!.toBigDecimal();
  }

  set stakedBalance(value: BigDecimal) {
    this.set("stakedBalance", Value.fromBigDecimal(value));
  }

  get stakedVotes(): BigDecimal {
    let value = this.get("stakedVotes");
    return value!.toBigDecimal();
  }

  set stakedVotes(value: BigDecimal) {
    this.set("stakedVotes", Value.fromBigDecimal(value));
  }
}