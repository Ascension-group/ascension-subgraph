import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { StakingMetric, User } from '../../generated/schema'
import { dayFromTimestamp } from './Dates'

export function loadOrCreateUser(address: Address): User {
  let user = User.load(address.toHex())
  if (!user) {
    user = new User(address.toHex())
  }
  return user
}

export function loadOrCreateStakingMetric(timestamp: BigInt): StakingMetric {
  let dayTimestamp = dayFromTimestamp(timestamp)
  let sm = StakingMetric.load(dayTimestamp)
  if (!sm) {
    sm = new StakingMetric(dayTimestamp)
  }
  return sm
}
