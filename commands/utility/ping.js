const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
  let start = Date.now()
  const embed = new Discord.MessageEmbed()
  .setDescription(`Fetching ping...`)
  .setColor(client.colors.theme);
  message.channel.send(embed).then(async (m) => {
    let end = Date.now();
    embed.setDescription(`Ping!`);
    embed.addField(`<:developer:741518183978238042> | API Latency`, Math.round(client.ws.ping) + " ms", true);
    embed.addField(`<:rules:739323550116085792> | Message Latency`, Math.round(end - start) + " ms", true);
    embed.setAuthor(message.author.username, message.author.avatarURL());
    embed.setFooter(client.user.username);
    embed.setTimestamp();
    await m.edit(embed).catch(console.log);
  })
  
  
}


module.exports.help = {
  name: "ping",
  aliases: ["pong"],
  category: "Utility"
}