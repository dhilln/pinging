const Discord = require("discord.js")
const client = new Discord.Client()

const message = require("./src/message")
const filter = require("./src/filter")
const data = require("./src/data/core")
const cli = require("./src/cli")
const error = require("./src/error")

var config = {}

data.readSetup()
.then(body => {
  if (!body.token) {
    console.log("Invalid config.js, no token")
    process.exit(1)
  }

  config = body
  client.login(body.token)
  .catch(err => error.fatal("Error while trying to login using provided token, Discord API response", err))
})
.catch(err => {
  console.log(err)
  process.exit(1)
})

client.on("ready", () => {
  if (config.username) client.user.setUsername(config.username)
  if (config.activity) client.user.setActivity(config.activity)

  console.log("Up and running!")

  cli.listGuilds(client)
})

client.on("error", error => {
  error.nonfatal("Discord API returned non fatal error", error)
})

client.on("message", msg => {
  message.handleCommand(msg, client)
  filter.handler(msg, client)
})

// Event handlers for listing guilds
client.on("guildCreate", guild => {
  console.log(`[PINGING EVENT] Just joined ${guild.name}`)
  cli.listGuilds(client)
})
client.on("guildDelete", guild => {
  console.log(`[PINGING EVENT] Just left ${guild.name}`)
  cli.listGuilds(client)
})
client.on("guildUpdate", guild => cli.listGuilds(client))