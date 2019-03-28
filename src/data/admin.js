var configCore = require("./core")

const list = () => {
  return new Promise((resolve, reject) => {
    configCore.read("setup")
    .then(body => {
      if (!body.admins) {
        reject("Invalid config.js, no admin")
        return
      }

      resolve(body.admins)
    })
    .catch(reject)
  })
}
exports.list = list

exports.check = id => {
  return new Promise((resolve, reject) => {
    list()
    .then(adminList => {
      resolve(adminList.includes(id))
    })
    .catch(reject)
  })
}

exports.add = id => {
  return new Promise((resolve, reject) => {
    configCore.read("setup")
    .then(body => {
      if (!body.admins) {
        reject("Invalid config.js, no admin")
        return
      }

      body.admins.push(id)

      configCore.write(JSON.stringify(body))
      .then(resolve)
      .catch(reject)
    })
    .catch(reject)
  })
}

exports.remove = id => {
  return new Promise((resolve, reject) => {
    configCore.read("setup")
    .then(body => {
      if (!body.admins) {
        reject("Invalid config.js, no admin")
        return
      }

      var indexOfAdmin = body.admins.indexOf(id)
      if (indexOfAdmin == -1) {
        reject("Not an admin")
        return
      }

      body.admins.splice(indexOfAdmin, 1)

      config.write(body)
      .then(resolve)
      .catch(reject)
    })
    .catch(reject)
  })
}
