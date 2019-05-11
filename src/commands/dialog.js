const admin = require("../data/admin")
const responses = require("../data/response")

function simonSays(msg, client, arg, responseList) {
  if (arg.length < 1) {
    msg.reply(responseList["missing-argument"])
    return
  }

  msg.channel.send(arg)
}
exports.simonSays = simonSays

function coinFlip(msg, client, arg, responseList) {
  const result = Math.random() > 0.5 ? "heads" : "tails"
  msg.reply(result + " :sunglasses:")
}
exports.coinFlip = coinFlip

function vaporwave(msg, client, arg, responseList) {
  if (arg.length < 1) {
    msg.reply(responseList["missing-argument"])
    return
  }

  const vaporwave = arg.split('').join(' ')
  msg.channel.send(vaporwave)
}
exports.vaporwave = vaporwave
