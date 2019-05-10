var configCore = require("./core")

function list() {
  return new Promise((resolve, reject) => {
    configCore.read("setup")
    .then(body => {
      if (!body.ignoring) {
        reject("Invalid config.js, no ignoring")
        return
      }

      resolve(body.ignoring)
    })
    .catch(reject)
  })
}
exports.list = list

function add(id) {
  return new Promise((resolve, reject) => {
    configCore.read("setup")
    .then(body => {
      if (!body.ignoring) {
        reject("Invalid config.js, no ignoring")
        return
      }

      body.ignoring.push(id)

      configCore.write(JSON.stringify(body))
      .then(resolve)
      .catch(reject)
    })
    .catch(reject)
  })
}
exports.add = add
