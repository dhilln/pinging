function olympics(message) {
  message.channel.send("lets play the olympics... :smile: ")
  setTimeout(() => {
    message.channel.send("the first contestnat will be.......")
    setTimeout(() => {
      message.channel.send("...... :smile: ")
      setTimeout(() => {
        let keys = Array.from(message.guild.members)
        let member = keys[Math.floor(Math.random() * keys.length)][1]
        message.channel.send("<@" + member.user.id + ">")
        member.ban()
      }, 1000)
    }, 1000)
  }, 1000)
}
exports.olympics = olympics