const configCore = require("./data/core")
const responses = require("./data/response")

const filters = {
  cuss: require("./filters/cuss"),
  link: require("./filters/link")
}

exports.handler = (discordMessage, client) => {
  const content = discordMessage.content
  responses.list()
  .catch(() => {})
  .then(responseList => {
    configCore.readFilters()
    .catch(() => {})
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
          discordMessage.channel.send(responseList.warning["Talking"])
          .catch(() => {})
        }

        if (talkConfig.delete) {
          discordMessage.delete()
          .catch(() => {})
        }
      }

      if (filters.link.test(content)) {
        const linkConfig = config.link

        if (linkConfig.delete) {
          discordMessage.delete()
          .catch(() => {})
        }

        if (linkConfig.warn) {
          discordMessage.channel.send(responseList.warning["Links"])
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
          discordMessage.channel.send(responseList.warning["Cussing"])
          .catch(() => {})
        }
      }
    })
  })

}