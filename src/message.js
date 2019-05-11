const admin = require("./data/admin")
const responses = require("./data/response")

function Command(description, func, admin) {
  this.description = description
  this.func = func
  this.admin = admin
}

const commandModules = {
  maintenance: require("./commands/maintenance"),
  aesthetics: require("./commands/aesthetics"),
  admin: require("./commands/admin"),
  dialog: require("./commands/dialog"),
  olympics: require("./commands/olympics")
}

const commands = {
  "help": new Command("List avaiable commands", commandModules.maintenance.help, false),
  "ping": new Command("Test if the bot is running", commandModules.maintenance.ping, false),
  "nick": new Command("Set the bot's nickname", commandModules.aesthetics.nick, true),
  "add-admin": new Command("Add an admin", commandModules.admin.add, true),
  "list-admins": new Command("List admins", commandModules.admin.list, true),
  "simon-says": new Command("Repeat what you say", commandModules.dialog.simonSays, true),
  "user-info": new Command("Return information on user or another user (must be admin to return others info)", commandModules.maintenance.userInfo, true),
  "coin-flip": new Command("Flip a coin", commandModules.dialog.coinFlip, false),
  "olympics": new Command("Play the Olympics", commandModules.olympics.olympics, true),
  "vaporwave": new Command("v a p o r w a v e i s g o o d", commandModules.dialog.vaporwave, false)
}
exports.commands = commands


function handleCommand(msg, client) {
  responses.listMaintenance()
  .then(responseList => {
    if (msg.content.slice(0, 1) == "*") {
      const commandText = msg.content.split(" ")[0].slice(1)

      if (!Object.keys(commands).includes(commandText)) {
        msg.reply(responseList["invalid-command"])
        return
      }

      const command = commands[commandText]
      const arg = msg.content.split(" ").slice(1).join(" ")

      admin.check(msg.author.id)
      .then(isAdmin => {
        if (command.admin && !isAdmin) {
          msg.reply(responseList["not-admin"])
          return
        }

        command.func(msg, client, arg, responseList)
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
    }
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
exports.handleCommand = handleCommand
