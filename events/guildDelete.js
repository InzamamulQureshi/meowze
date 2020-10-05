const discord = require("discord.js")

module.exports = async(client, guild) => {
  
  let guildid = guild.id
  
  const embed = new discord.MessageEmbed()
  .setAuthor("Left " + guild.name)
  .addField(`Guild Name -`, guild.name)
  .addField(`Membercount - `, guild.members.cache.size)
  .addField(`Guild ID -`, guild.id)
  .addField(`Guild Owner -`, guild.owner.user.tag)
   .setFooter(`Guild Count: ${client.guilds.cache.size} | Member Count: ${client.users.cache.size}`)
   .setThumbnail(guild.iconURL({dynamic: true}))
  
  let invser = client.guilds.cache.get(guildid)
  invser.channels.cache.first().createInvite({maxAge: 0, reason: "Used for logs"}).then(invite => embed.addField("Invite Link - ", invite.url))
  
  client.channels.cache.get("757464393704407061").send(embed).catch(console.log)
  
  
  

}