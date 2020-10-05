const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissons to execute this command!")
 const user = message.mentions.users.first() || message.author
 
  let warn = await client.db.get(`warns_${user.id}_${message.guild.id}`);
  if(!warn) warn = 0;
  
  let warnings = await client.db.get(`warnings_${user.id}_${message.guild.id}`);
  if(!warnings) warnings = "This user does not have any warnings."
 
  let embed = new discord.MessageEmbed()
  .setTitle(`${user.id === message.author.id ? `You have ${warn} warnings` : `${user.username} has ${warn} warnings`}`)
  .setDescription(warnings)
  .setColor(client.colors.theme)
  message.channel.send(embed).catch(console.log);
  
}
module.exports.help = {
  name: "checkwarn",
  aliases: ["cw", "warnings"],
  category: "Moderation",
  description: "Check Warn Of a User",
  usage: "checkwarn"
}
