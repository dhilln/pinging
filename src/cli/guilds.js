function list(client) {
  const guildNames = client.guilds.map(guild => guild.name)

  console.log(`\nGUILD LIST (${guildNames.length})`)
  if (guildNames.length > 25) {
    console.log("Guild list exceeds maximum of 25");
  } else {
    guildNames.forEach(name => {
      console.log(`- ${name}`)
    })
  }
  console.log("\n")

}
exports.list = list