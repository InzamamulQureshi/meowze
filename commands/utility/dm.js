const Discord = require('discord.js')
const MessageEmbed = require("discord.js")

module.exports.run = async (client, message, args) => {
  
  if(args[0] == "lock") {
    client.db.set("lock_" + message.author.id, true)
  return  message.channel.send("You will no longer get dms from bot with dm command")
  } 
  if(args[0] == "unlock") {
    client.db.delete("lock_" + message.author.id)
    return message.channel.send("You now have your dms unlocked")
  } else {
   var user = message.mentions.users.first() 
  if(!user) return message.channel.send("Please Mention a Valid User to Dm 🚫")
  let lock = await client.db.get(`lock_${user.id}`)
  
  let say = message.content.split(" ").slice(2).join(" ")
  if(!say) return message.channel.send("Please Provide a Messsage to Dm")
 
 if(lock === true) {
   message.channel.send("This user does not allow dms")
 }
  if(lock === null) {
  var embed = new Discord.MessageEmbed()
  .setTitle("You Got New Mail")
  .setDescription(say)
  .setColor(client.colors.theme)
  .setFooter(`Mail From ${message.author.username}`)
  message.delete()
  user.send(embed)
  var embed2 = new Discord.MessageEmbed()
  .setDescription(`Dm Successfully Sent to ${user.username} `)
  .setColor(client.colors.theme)
  message.channel.send(embed2).then(msg => msg.delete({timeout: 3000}))
}
}
}

module.exports.help = {
 name: "dm",
  aliases: ["pm"],
  category: "Utility",
  description: "Dm's The Mentioned User",
  usage: "dm <@mentionuser> <Your message>",
} 