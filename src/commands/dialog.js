const admin = require("../data/admin")
const responses = require("../data/response")
const giphy = require("../api/giphy")

exports.simonSays = (msg, client, arg, responseList, isAdmin) => {
  if (arg.length < 1) {
    msg.reply(responseList["NoArgument"])
    return
  }

  msg.channel.send(arg)
}

exports.gif = (msg, client, arg, responseList, isAdmin) => {
  if (arg.length < 1) {
    msg.reply(responseList["NoArgument"])
    return
  }

  const splitArg = arg.split(" ")
  if (splitArg[0].slice(0, 1) == "*") {
    try {
      var count = parseInt(splitArg[0].slice(1))
    } catch (err) {
      msg.reply("please enter a valid number :(")
      return
    }

    if (count > 5) {
      msg.reply("no more than 5 gifs pls")
      return
    }

    var gifSearch = splitArg.slice(1).join(" ")
  } else {
    var count = 1
    var gifSearch = arg
  }

  var gifs = []
  var index = 0
  for (i = 0; i < count; i++) {
    giphy.randomGif(gifSearch)
    .then(url => {
      gifs.push(url)
      index++
      if (index == count) {
        msg.reply("`" + gifSearch + "` gifs found " + gifs.join(" "))
      }
    })
    .catch(err => console.log(err))
  }
}

exports.coinFlip = (msg, client, arg, responseList, isAdmin) => {
  const result = Math.random() > 0.5 ? "heads" : "tails"
  msg.reply(result + " :sunglasses:")
}
