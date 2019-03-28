const Filter = require("bad-words")
const cussFilter = new Filter()

exports.test = message => {
  if (message.length <= 0) {
    return
  }
  return cussFilter.isProfane(message)
}