const admin = require("../data/admin")

exports.add = (msg, client, arg, responseList, isAdmin) => {
  const mentions = msg.mentions.users.map(item => {
    return item
  })

  if (mentions.length < 1) {
    msg.reply(responseList["NoArgument"])
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

exports.list = (msg, client, arg, responseList, isAdmin) => {
  admin.list()
  .then(adminList => {
    const formattedList = adminList.map(id => {
      return `<@${id}>`
    }).join(", ")

    msg.reply("the admins are: " + formattedList)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
}
