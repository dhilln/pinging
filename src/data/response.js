const configCore = require("./core")

exports.listMaintenance = () => listSection("maintenance", ["success", "error", "not-admin", "missing-argument", "invalid-command"])
exports.listCommands = () => listSection("commands", ["ping"])
exports.listWarnings = () => listSection("warning", ["cussing", "talking", "discord-links"])

function listSection(section, requriedKeys) {
  return new Promise((resolve, reject) => {
    configCore.readResponses()
    .then(responseList => {
      if (responseList[section] == undefined) {
        console.log(`Invalid section \"${section}\" in response.js, cannot be found`)
        process.exit(1)
      }

      const sectionResponseList = responseList[section]
      const responseListKeys = Object.keys(sectionResponseList)
      for (key in requriedKeys) {
        if (!responseListKeys.includes(requriedKeys[key])) {
          console.log(`Invalid section \"${section}\" in responses.json, should include keys:\n  - ${requriedKeys.join("\n  - ")}`)
          process.exit(1)
        }
      }

      resolve(sectionResponseList)
    })
    .catch(reject)
  })
}