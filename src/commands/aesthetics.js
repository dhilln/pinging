const admin = require("../data/admin")
const responses = require("../data/response")

exports.nick = (msg, client, arg, responseList, isAdmin) => {
  if (arg.length < 1) {
    msg.reply(responseList["NoArgument"])
    return
  }

  msg.guild.member(client.user).setNickname(arg)
  .then(() => msg.reply(responseList["Success"]))
  .catch(err => {
    console.log(err)
    msg.reply(responseList["Error"])
  })
}
