const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
  let ch = message.channel;
  let channel = client.snipe.get(ch.id);
  if(!channel) return message.channel.send(`There are no message deleted!`);
  let user = client.users.cache.get(channel.sender);
  if(user.bot)return message.channel.send("There are no message deleted!");
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.tag, user.avatarURL())
  .setDescription(channel.content)
  .setTimestamp()
  .setFooter(client.user.username, client.user.avatarURL())
  .setColor(client.colors.theme)
  message.channel.send(embed).catch(console.log)

}

module.exports.help = {
 name: "snipe",
 aliases: ["Snipe", "SNIPE"],
 category: "Utility"
}