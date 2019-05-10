const linkRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-zA-Z1-9]/

function test(message) {
  return linkRegex.test(message)
}
exports.test = test