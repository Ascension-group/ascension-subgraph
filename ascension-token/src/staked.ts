import { Address } from "@graphprotocol/graph-ts"
import { AscensionToken, Transfer } from "../generated/AscensionStakedToken/AscensionToken"
import { User } from "../generated/schema"
import { toDecimal } from "./utils/Decimals"

export function handleTransfer(event: Transfer): void {
  let token = AscensionToken.bind(Address.fromString("0x40EaFEc3C261F7e706289d3b3aFEF812A6CA10cD"))

  //handle from
  let fromAddress = event.params.from
  let fromUser = User.load(fromAddress.toHex())
  if (!fromUser) {
    fromUser = new User(fromAddress.toHex())
  }
  let fromTokenBalance = token.balanceOf(fromAddress)
  fromUser.stakedBalance = toDecimal(fromTokenBalance)
  let fromTokenVotes = token.getVotes(fromAddress)
  fromUser.stakedVotes = toDecimal(fromTokenVotes)
  fromUser.save()

  //handle to
  let toAddress = event.params.to
  let toUser = User.load(toAddress.toHex())
  if (!toUser) {
    toUser = new User(toAddress.toHex())
  }
  let toTokenBalance = token.balanceOf(toAddress)
  toUser.stakedBalance = toDecimal(toTokenBalance)
  let toTokenVotes = token.getVotes(toAddress)
  toUser.stakedVotes = toDecimal(toTokenVotes)
  toUser.save()
}
