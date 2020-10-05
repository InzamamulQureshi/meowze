const discord = require("discord.js")

module.exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author
  const embed = new discord.MessageEmbed()
  .setAuthor(`${user.username}'s Avatar`, user.displayAvatarURL({dynamic: true}))
  .setDescription(`[Download](${user.displayAvatarURL({dynamic: true})})`)
  .setImage(user.avatarURL({dynamic: true, size: 2048}))
  .setFooter(client.user.username, client.user.avatarURL({dynamic: true}))
  .setColor(client.colors.theme)
  message.channel.send(embed).catch(e => message.channel.send(e.message))
}
 
module.exports.help = {
name: "avatar",
aliases: ['av', 'pfp'],
category: "Utility"
}