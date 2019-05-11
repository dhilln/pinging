const configCore = require("./data/core")
const responses = require("./data/response")

const filters = {
  cuss: require("./filters/cuss"),
  link: require("./filters/link")
}

function handler(discordMessage, client) {
  const content = discordMessage.content
  responses.listWarnings()
  .then(warningList => {
    configCore.readFilters()
    .then(config => {
      const talkConfig = config.talking

      if (client.user.id == discordMessage.author.id) {
        return
      }

      if (talkConfig.warn || talkConfig.ban || talkConfig.delete) {
        if (talkConfig.ban) {
          discordMessage.member.ban()
          .catch(() => {})
        }

        if (talkConfig.warn) {
          discordMessage.channel.send(warningList.talking)
          .catch(() => {})
        }

        if (talkConfig.delete) {
          discordMessage.delete()
          .catch(() => {})
        }
      }

      if (filters.link.test(content)) {
        const linkConfig = config["discord-link"]

        if (linkConfig.delete) {
          discordMessage.delete()
          .catch(() => {})
        }

        if (linkConfig.warn) {
          discordMessage.channel.send(warningList["discord-links"])
          .catch(() => {})
        }
      }

      if (filters.cuss.test(content)) {
        const cussingConfig = config.cussing

        if (cussingConfig.delete) {
          discordMessage.delete()
          .catch(() => {})
        }

        if (cussingConfig.warn) {
          discordMessage.channel.send(warningList.cussing)
          .catch(() => {})
        }
      }
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
exports.handler = handler