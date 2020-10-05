const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
  
  let rules = new MessageEmbed()
  .setColor(client.colors.theme)
  .setTitle("Rules")
  .setDescription("When using this bot, you need to follow some rules, they are:\n1. Do not spam commands.\n2. Do not misuse bot.\n3. Do not take advantages of bugs.")
  message.channel.send(rules)
  
}

module.exports.help = {
  name: "rules",
  aliases: [],
  category: "Utility"
}