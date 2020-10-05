const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {
  
  const embed = new Discord.MessageEmbed()
  .setTitle("Invite Links!")
  .setDescription(`**Invite Bot -**\nClick [here](https://discordapp.com/api/oauth2/authorize?client_id=695551251798032444&permissions=8&scope=bot) to invite\n\n**Support Server -**\nClick [here](https://discord.gg/e7dQz7c) to join`)
  .setColor(client.colors.theme)
  .setFooter("Powered By Meowze")
  message.channel.send(embed)
}

module.exports.help = {
  name: "invite", 
  aliases: ["inv"],
category: "Utility"
}