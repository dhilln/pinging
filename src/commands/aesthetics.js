const admin = require("../data/admin")
const responses = require("../data/response")

function nick(msg, client, arg, responseList) {
  if (arg.length < 1) {
    msg.reply(responseList["missing-argument"])
    return
  }

  msg.guild.member(client.user).setNickname(arg)
  .then(() => msg.reply(responseList["success"]))
  .catch(err => {
    console.log(err)
    msg.reply(responseList["error"])
  })
}
exports.nick = nick