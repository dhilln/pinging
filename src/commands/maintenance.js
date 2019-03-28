const message = require("../message")
const admin = require("../data/admin")

exports.help = (msg, client, arg, responseList, isAdmin) => {
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

exports.ping = (msg, client, arg, responseList, isAdmin) => {
  msg.reply(responseList["Ping"])
}

exports.userInfo = (msg, client, arg, responseList, isAdmin) => {
  const mentions = msg.mentions.users.map(item => {
    return item
  })

  if (mentions.length < 1) var user = msg.author
  else {
    if (!isAdmin) {
      msg.reply(responseList["NotAdmin"])
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
