const request = require("request")
const data = require("../data/core")

data.read("setup")
.then(data => {
  if (!data.giphyToken) {
    console.log("Invalid config, missing giphyToken")
    process.exit(1)
  }

  const token = data.giphyToken

  exports.randomGif = search => {
    return new Promise((resolve, reject) => {
      request.get("https://api.giphy.com/v1/gifs/random?api_key=" + token + "&tag=" + search.replace(/\s/, "%20"), (err, res, body) => {
        if (err) {
          reject(err)
          return
        }

        try {
          var jsonBody = JSON.parse(body)
        } catch (err) {
          reject("Invalid data from Giphy")
          return
        }

        const url = jsonBody.data.url
        if (url) resolve(url)
        else reject("No URL given from Giphy")
      })
    })
  }
})
.catch(err => {
  console.log(err)
  process.exit(1)
})
