const discord = require('discord.js')

module.exports = async(client, role, newRole) => {
  
  let ch = await client.db.get(`modlog_${role.guild.id}`)
  
  if(!role) {
    return
  }
  
  const embed = new discord.MessageEmbed()
  .setTitle(`Role Updated`)
  .setDescription(`${newRole} got updated`)
  .setColor(client.colors.theme)
  .setFooter(`Role ID: ${newRole.id}`)
  .setTimestamp()
  client.channels.cache.get(ch).send(embed).catch(console.log)
}