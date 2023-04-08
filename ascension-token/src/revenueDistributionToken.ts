import { Address } from '@graphprotocol/graph-ts'
import {
  AscensionRevenueDistributionToken,
  Deposit,
  Transfer,
} from '../generated/AscensionRevenueDistributionToken/AscensionRevenueDistributionToken'
import { DailySnapshot, User } from '../generated/schema'
import { toDecimal } from './utils/Decimals'

export function handleTransfer(event: Transfer): void {
  let token = AscensionRevenueDistributionToken.bind(
    Address.fromString('0x42F5A9B27a60a7558D196747cb43e14cBe13B398')
  )

  //handle from
  let fromAddress = event.params.from
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = new User(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.balance = toDecimal(fromTokenBalance)
  let fromTokenVotes = token.getVotes(fromAddress)
  fromUser.votes = toDecimal(fromTokenVotes)
  fromUser.totalBalance = fromUser.balance.plus(fromUser.stakedBalance)
  fromUser.save()

  //handle to
  let toAddress = event.params.to
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = new User(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.balance = toDecimal(toTokenBalance)
  let toTokenVotes = token.getVotes(toAddress)
  toUser.votes = toDecimal(toTokenVotes)
  toUser.totalBalance = toUser.balance.plus(toUser.stakedBalance)
  toUser.save()
}

export function handleDeposit(event: Deposit): void {
  let token = AscensionRevenueDistributionToken.bind(
    Address.fromString('0x42F5A9B27a60a7558D196747cb43e14cBe13B398')
  )

  //handle from
  let fromAddress = event.params.sender
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = new User(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.balance = toDecimal(fromTokenBalance)
  let fromTokenVotes = token.getVotes(fromAddress)
  fromUser.votes = toDecimal(fromTokenVotes)
  fromUser.totalBalance = fromUser.balance.plus(fromUser.stakedBalance)
  fromUser.save()

  //handle to
  let toAddress = event.params.owner
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = new User(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.balance = toDecimal(toTokenBalance)
  let toTokenVotes = token.getVotes(toAddress)
  toUser.votes = toDecimal(toTokenVotes)
  toUser.totalBalance = toUser.balance.plus(toUser.stakedBalance)
  toUser.save()

  // Update total assets
  let snapshot = DailySnapshot.load(event.block.timestamp.toString())
  if (!snapshot) {
    snapshot = new DailySnapshot(event.block.timestamp.toString())
    snapshot.totalAssets = toDecimal(token.totalSupply())
  } else {
    snapshot.totalAssets = snapshot.totalAssets.plus(
      toDecimal(event.params.assets)
    )
  }
  snapshot.save()
}
