const configCore = require("./core")

const requriedKeys = ["Success", "Error", "NotAdmin", "Ping", "NoArgument", "InvalidCommand"]

function list() {
  return new Promise((resolve, reject) => {
    configCore.readResponses()
    .then(responseList => {
      const responseListKeys = Object.keys(responseList)
      for (key in requriedKeys) {
        if (!responseListKeys.includes(requriedKeys[key])) {
          console.log("Invalid responses.json, should include " + requriedKeys[key])
          process.exit(1)
        }
      }

      resolve(responseList)
    })
    .catch(reject)
  })
}
exports.list = list