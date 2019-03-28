const fs = require("fs")
const path = require("path")

const configPaths = {
  setup: path.resolve(__dirname + "../../../config/setup.json"),
  responses: path.resolve(__dirname + "../../../config/responses.json")
}

exports.read = type => {
  return new Promise((resolve, reject) => {
    if (!configPaths[type]) {
      reject("Invalid config type")
      return
    }

    fs.readFile(configPaths[type], "utf8", (err, body) => {
      if (err) {
        reject(err)
        return
      }

      try {
        var parsedBody = JSON.parse(body)
      } catch (err) {
        if (err) {
          reject(err)
          return
        }
      }

      resolve(parsedBody)
    })
  })
}

exports.write = body => {
  return new Promise((resolve, reject) => {
    try {
      JSON.parse(body)
    } catch (err) {
      reject("Not valid JSON")
      return
    }

    fs.writeFile(configPaths.setup, body, (err) => {
      if (err) {
        reject(err)
        return
      } else resolve()
    })
  })
}
