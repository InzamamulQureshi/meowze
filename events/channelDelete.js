const discord = require("discord.js")

module.exports = async(client, channel) => {
  
  let ch = await client.db.get(`modlog_${channel.guild.id}`)
  
  if(!ch) {
    return;
  }
  
  const embed = new discord.MessageEmbed()
  .setTitle("Channel Deleted")
  .setDescription(`Channel ID: ${channel.id}\nChannel Name: **#${channel.name}**`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username)
  .setTimestamp()
  client.channels.cache.get(ch).send(embed).catch(console.log)
}