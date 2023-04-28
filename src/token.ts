import { Address } from '@graphprotocol/graph-ts'
import {
  AscensionToken,
  Transfer,
} from '../generated/AscensionToken/AscensionToken'
import { User } from '../generated/schema'
import { toDecimal } from './utils/Decimals'
import { createNewUser } from './utils/users'

export function handleTransfer(event: Transfer): void {
  let token = AscensionToken.bind(
    Address.fromString('0x9e724698051DA34994F281bD81C3E7372d1960AE')
  )

  // Handle 'from' user
  let fromAddress = event.params.from
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = createNewUser(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.balance = toDecimal(fromTokenBalance)
  fromUser.totalBalance = fromUser.balance.plus(fromUser.stakedBalance)
  fromUser.save()

  // Handle 'to' user
  let toAddress = event.params.to
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = createNewUser(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.balance = toDecimal(toTokenBalance)
  toUser.totalBalance = toUser.balance.plus(toUser.stakedBalance)
  toUser.save()
}
