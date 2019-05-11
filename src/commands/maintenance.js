const message = require("../message")
const admin = require("../data/admin")
const responses = require("../data/response")

function help(msg, client, arg, responseList) {
  const commands = Object.keys(message.commands).reduce((filtered, commandName) => {
    const command = message.commands[commandName]
    if (command.admin) {
      if (!isAdmin) {
        return filtered
      }
    }

    filtered.push(commandName + " - " + command.description + (command.admin ? " [ADMIN]" : ""))
    return filtered
  }, []).join("\n")

  msg.reply("```" + commands + "```")
}
exports.help = help

function ping(msg, client, arg, responseList) {
  responses.listCommands()
  .then(commandsList => {
    msg.reply(commandsList["ping"])
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
exports.ping = ping

function userInfo(msg, client, arg, responseList) {
  const mentions = msg.mentions.users.map(item => {
    return item
  })

  if (mentions.length < 1) var user = msg.author
  else {
    if (!isAdmin) {
      msg.reply(responseList["not-admin"])
      return
    }
    var user = mentions[0]
  }

  admin.check(user.id)
  .then(userIsAdmin => {
    msg.reply("```username: " + user.username + "#" + user.discriminator + "\nid: " + user.id + "\nbot: " + user.bot + "\nadmin: " + userIsAdmin + "```")
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
exports.userInfo = userInfo