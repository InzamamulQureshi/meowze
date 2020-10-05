const discord = require("discord.js")

module.exports = async(client, channel) => {
  
  let ch = await client.db.get(`modlog_${channel.guild.id}`)
  
  if(!ch) {
    return;
  }
  
  const embed = new discord.MessageEmbed()
  .setTitle("Channel Created")
  .setDescription(`Channel ID: ${channel.id}\nChannel Name: ${channel}`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username)
  client.channels.cache.get(ch).send(embed).catch(console.log)
}