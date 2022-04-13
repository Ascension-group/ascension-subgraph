import { Address } from '@graphprotocol/graph-ts'
import {
  AscensionStakedToken,
  MintCall,
  BurnCall,
  Transfer,
} from '../generated/AscensionStakedToken/AscensionStakedToken'
import { ZERO_ADDRESS } from './utils/Constants'
import { toDecimal } from './utils/Decimals'
import { loadOrCreateStakingMetric, loadOrCreateUser } from './utils/LoadOrCreate'

export function handleTransfer(event: Transfer): void {
  let token = AscensionStakedToken.bind(
    Address.fromString('0x40EaFEc3C261F7e706289d3b3aFEF812A6CA10cD')
  )

  //handle from
  let fromAddress = event.params.from

  let fromUser = loadOrCreateUser(fromAddress)

  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.stakedBalance = toDecimal(fromTokenBalance)
  let fromTokenVotes = token.getVotes(fromAddress)
  fromUser.stakedVotes = toDecimal(fromTokenVotes)
  fromUser.totalBalance = fromUser.balance + fromUser.stakedBalance
  fromUser.save()

  //handle to
  let toAddress = event.params.to
  let toUser = loadOrCreateUser(toAddress)
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.stakedBalance = toDecimal(toTokenBalance)
  let toTokenVotes = token.getVotes(toAddress)
  toUser.stakedVotes = toDecimal(toTokenVotes)
  toUser.totalBalance = toUser.balance + toUser.stakedBalance
  toUser.save()

  if (toAddress.toHex() == ZERO_ADDRESS || fromAddress.toHex() == ZERO_ADDRESS) {
    let sm = loadOrCreateStakingMetric(event.block.timestamp)
    sm.totalStaked = toDecimal(token.totalSupply())
    sm.save()
  }
}
