const admin = require("../data/admin")

function add(msg, client, arg, responseList) {
  const mentions = msg.mentions.users.map(item => {
    return item
  })

  if (mentions.length < 1) {
    msg.reply(responseList["missing-argument"])
    return
  }

  var success = []
  mentions.forEach((item, index) => {
    admin.add(item.id)
    .then(() => {
      success.push(item)

      if (index == mentions.length - 1) {
        if (success.length > 0) msg.reply("added " + success.map(item => {
          return `<@${item.id}>`
        }).join(", ") + "")
        else msg.reply("i added no one, i ran into an error :(")
      }
    })
    .catch(err => console.log(err))
  })
}
exports.add = add