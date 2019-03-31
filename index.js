const Discord = require("discord.js")
const client = new Discord.Client()

const message = require("./src/message")
const filter = require("./src/filter")
const data = require("./src/data/core")

var config = {}

data.read("setup")
.then(body => {
  if (!body.token) {
    console.log("Invalid config.js, no token")
    process.exit(1)
  }

  config = body
  client.login(body.token)
})
.catch(err => {
  console.log(err)
  process.exit(1)
})

client.on("ready", () => {
  if (config.username) client.user.setUsername(config.username)
  if (config.activity) client.user.setActivity(config.activity)

  console.log("Up and running!")
})

client.on("message", msg => {
  message.handleCommand(msg, client)
  filter.handler(msg, client)
})

client.on("error", error => {
  console.log("[ERROR] Discord.js client error, outputting to console...")
  console.log(error)
})
