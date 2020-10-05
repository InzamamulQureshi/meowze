const discord = require('discord.js')

module.exports = async(client, member) => {
  
  let modlog = await client.db.get(`modlog_${member.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = await client.db.get(`modlog_${member.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setAuthor("Member Joined", member.user.avatarURL({dynamic: true}))
    .setDescription(`${member.user} just joined the server, this server now has ${member.guild.members.cache.size} members`)
    .setTimestamp()
    .setFooter(`Member ID - ${member.user.id}`)
    .setTimestamp()
    .setColor(client.colors.theme)
    client.channels.cache.get(ch).send(modlogembed).catch(console.log)

  if(member.user.bot) {
    let bots = member.guild.members.cache.filter(m => m.user.bot)
    let br = await client.db.get(`bar_${member.guild.id}`)
    
    if(br === null) return;
   
    member.roles.add(br).catch(console.log)
    
  } else {
    let ar = await client.db.get(`har_${member.guild.id}`)
    if(ar === null) return;
    
    member.roles.add(ar).catch(console.log)
  }
}