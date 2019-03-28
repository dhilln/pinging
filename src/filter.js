const configCore = require("./data/core")
const responses = require("./data/response")

const filters = {
  cuss: require("./filters/cuss"),
  link: require("./filters/link")
}

exports.handler = (discordMessage, client) => {
  const content = discordMessage.content
  responses.list()
  .then(responseList => {
    configCore.read("filters")
    .then(config => {
      const talkConfig = config.talking

      if (client.user.id == discordMessage.author.id) {
        return
      }

      if (talkConfig.warn || talkConfig.ban || talkConfig.delete) {
        if (talkConfig.ban) {
          discordMessage.member.ban()
        }

        if (talkConfig.warn) {
          discordMessage.channel.send(responseList.warning["Talking"])
        }

        if (talkConfig.delete) {
          discordMessage.delete()
        }
      }

      if (filters.link.test(content)) {
        const linkConfig = config.link

        if (linkConfig.delete) {
          discordMessage.delete()
        }

        if (linkConfig.warn) {
          discordMessage.channel.send(responseList.warning["Links"])
        }
      }

      if (filters.cuss.test(content)) {
        const cussingConfig = config.cussing

        if (cussingConfig.delete) {
          discordMessage.delete()
        }

        if (cussingConfig.warn) {
          discordMessage.channel.send(responseList.warning["Cussing"])
        }
      }
    })
  })

}