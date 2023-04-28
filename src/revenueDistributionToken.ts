import { Address } from '@graphprotocol/graph-ts'
import {
  AscensionRevenueDistributionToken,
  Deposit,
  Withdraw,
  Transfer,
} from '../generated/AscensionRevenueDistributionToken/AscensionRevenueDistributionToken'
import { StakingSnapshot, User } from '../generated/schema'
import { toDecimal } from './utils/Decimals'
import { createNewUser } from './utils/users'

export function handleTransfer(event: Transfer): void {
  let token = AscensionRevenueDistributionToken.bind(
    Address.fromString('0x42F5A9B27a60a7558D196747cb43e14cBe13B398')
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

export function handleDeposit(event: Deposit): void {
  let token = AscensionRevenueDistributionToken.bind(
    Address.fromString('0x42F5A9B27a60a7558D196747cb43e14cBe13B398')
  )

  // Handle 'from' user
  let fromAddress = event.params.sender
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = createNewUser(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.balance = toDecimal(fromTokenBalance)
  fromUser.totalBalance = fromUser.balance.plus(fromUser.stakedBalance)
  fromUser.save()

  // Handle 'to' user
  let toAddress = event.params.owner
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = createNewUser(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.balance = toDecimal(toTokenBalance)
  toUser.totalBalance = toUser.balance.plus(toUser.stakedBalance)
  toUser.save()

  // Update total assets
  let snapshot = StakingSnapshot.load(event.block.timestamp.toString())
  if (!snapshot) {
    snapshot = new StakingSnapshot(event.block.timestamp.toString())
    snapshot.totalAssets = toDecimal(token.totalAssets())
    snapshot.totalSupply = toDecimal(token.totalSupply())
  } else {
    snapshot.totalAssets = toDecimal(token.totalAssets())
    snapshot.totalSupply = toDecimal(token.totalSupply())
  }
  snapshot.save()
}

export function handleWithdraw(event: Withdraw): void {
  let token = AscensionRevenueDistributionToken.bind(
    Address.fromString('0x42F5A9B27a60a7558D196747cb43e1414cBe13B398')
  )

  // Handle 'from' user
  let fromAddress = event.params.sender
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = createNewUser(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.balance = toDecimal(fromTokenBalance)
  fromUser.totalBalance = fromUser.balance.plus(fromUser.stakedBalance)
  fromUser.save()

  // Handle 'to' user
  let toAddress = event.params.owner
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = createNewUser(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.balance = toDecimal(toTokenBalance)
  toUser.totalBalance = toUser.balance.plus(toUser.stakedBalance)
  toUser.save()

  // Update total assets
  let snapshot = StakingSnapshot.load(event.block.timestamp.toString())
  if (!snapshot) {
    snapshot = new StakingSnapshot(event.block.timestamp.toString())
    snapshot.totalAssets = toDecimal(token.totalAssets())
    snapshot.totalSupply = toDecimal(token.totalSupply())
  } else {
    snapshot.totalAssets = toDecimal(token.totalAssets())
    snapshot.totalSupply = toDecimal(token.totalSupply())
  }
  snapshot.save()
}
