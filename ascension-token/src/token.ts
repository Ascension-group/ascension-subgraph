import { Address } from "@graphprotocol/graph-ts"
import { AscensionToken, Transfer } from "../generated/AscensionToken/AscensionToken"
import { User } from "../generated/schema"
import { toDecimal } from "./utils/Decimals"

export function handleTransfer(event: Transfer): void {
  let token = AscensionToken.bind(Address.fromString("0x9e724698051DA34994F281bD81C3E7372d1960AE"))

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
  toUser.save()
}
