const discord = require('discord.js')

module.exports = async(client, role) => {
  
  let ch = await client.db.get(`modlog_${role.guild.id}`)
  
  if(!role) {
    return
  }
  
  const embed = new discord.MessageEmbed()
  .setTitle(`Role Created`)
  .setDescription(`Role Name: ${role}\nRole ID: ${role.id}`)
  .setColor(client.colors.theme)
  .setFooter(role.guild.name)
  .setTimestamp()
  client.channels.cache.get(ch).send(embed).catch(console.log)
}