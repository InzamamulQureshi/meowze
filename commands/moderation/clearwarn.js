const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissons to execute this command!");
  
 const user = message.mentions.users.first() || message.author;
  
client.db.set(`warns_${user.id}_${message.guild.id}`, 0);
client.db.delete(`warnings_${user.id}_${message.guild.id}`)
  
   var ClearWarnEmbed = new discord.MessageEmbed()
    .setTitle("Clear Warns!")
    .setDescription(`Successfully cleared warns for ${user.username}!`)
    .setColor(client.colors.success)
    message.channel.send(ClearWarnEmbed)
  
  let modlog = await client.db.get(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Cleared Warn")
    .addField(`Action: `, `Clearwarn`)
    .addField(`User: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .setColor(client.colors.success)
    client.channels.cache.get(ch).send(modlogembed)
  
}

module.exports.help = {
  name: "clearwarn",
  aliases: ["removewarn"],
  category: "Moderation",
  description: "Clears Warn Of the Mentioned User or The Author",
  usage: "clearwarn"
}