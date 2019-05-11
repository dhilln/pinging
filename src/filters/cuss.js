const Filter = require("bad-words")
const cussFilter = new Filter()

function test(message) {
  if (message.length <= 0) {
    return
  }
  return cussFilter.isProfane(message)
}
exports.test = test