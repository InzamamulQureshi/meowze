const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Do Not Have Enough Permissions to use this command <:SadCat:695583948633538570>")
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Please Give Me Manage Messages Permission to use this command <:SadCat:695583948633538570>")
  if(!args[0]) return message.channel.send("Please Provide a Valid No. of Messages to Clear")
  if(isNaN(args[0])) return message.channel.send(`\`${args[0]}\` is Not a Valid Number to Purge`)
  if(args[0] >= 100 ) return message.channel.send("I Cannot Purge More Than 100 Messages")
 message.channel.bulkDelete(args[0])
  message.channel.send(`Deleted ${args[0]} Messages`).then(m => m.delete({timeout: 2000}))
}

module.exports.help = {
  name: "purge",
  aliases: ["clean", "clear", "prune"],
  category: "Moderation"
}