import { User } from '../../generated/schema'
import { BigDecimal } from '@graphprotocol/graph-ts'

export function createNewUser(address: string): User {
  let user = new User(address)
  user.balance = BigDecimal.fromString('0')
  user.stakedBalance = BigDecimal.fromString('0')
  user.totalBalance = BigDecimal.fromString('0')
  return user
}
