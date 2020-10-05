const discord = require("discord.js")

module.exports = async(client, channel, newChannel) => {
  
  let ch = await client.db.get(`modlog_${channel.guild.id}`)
  
  if(!ch) {
    return;
  }
  
  const embed = new discord.MessageEmbed()
  .setTitle(`Channel Updated`)
  .setDescription(`${newChannel} got updated`)
  .setColor(client.colors.theme)
  .setFooter(`Channel ID: ${newChannel.id}`)
  .setTimestamp()
  client.channels.cache.get(ch).send(embed).catch(console.log)
  
}