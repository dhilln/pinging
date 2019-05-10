const admin = require("../data/admin")
const responses = require("../data/response")

function simonSays(msg, client, arg, responseList, isAdmin) {
  if (arg.length < 1) {
    msg.reply(responseList["NoArgument"])
    return
  }

  msg.channel.send(arg)
}
exports.simonSays = simonSays

function coinFlip(msg, client, arg, responseList, isAdmin) {
  const result = Math.random() > 0.5 ? "heads" : "tails"
  msg.reply(result + " :sunglasses:")
}
exports.coinFlip = coinFlip