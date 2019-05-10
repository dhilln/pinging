const fs = require("fs")
const path = require("path")

const configPaths = {
  setup: path.resolve(__dirname + "../../../config/setup.json"),
  responses: path.resolve(__dirname + "../../../config/responses.json"),
  filters: path.resolve(__dirname + "../../../config/filters.json")
}

exports.readSetup = () => readPath(configPaths.setup)
exports.readResponses = () => readPath(configPaths.responses)
exports.readFilters = () => readPath(configPaths.filters)

exports.writeSetup = body => writePath(configPaths.setup, body)

function readPath(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, body) => {
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
exports.readPath = readPath

function writePath(body) {
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
exports.writePath = writePath
