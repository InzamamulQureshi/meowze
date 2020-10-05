const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {
  const embed =  new Discord.MessageEmbed()
  .setTitle(`Upvote Meowze`)
  .setDescription(`Top.gg -\nhttps://top.gg/bot/695551251798032444`)
  .setColor(client.colors.theme)
  message.channel.send(embed)
}

module.exports.help = {
  name: "upvote",
  aliases: ["vote"],
  category: "Utility"
}