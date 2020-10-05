const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {
  let poll = args.join(" ")
  if(!poll) return message.channel.send("Please Provide A Message to Make Poll/Vote Of")
  const embed = new Discord.MessageEmbed()
  .setTitle("New Poll!")
  .setDescription(`${poll}`)
  .setFooter(`Poll By ${message.author.username}`)
  .setTimestamp()
  .setColor(client.colors.theme)
  message.delete()
  message.channel.send(embed).then(async m => {
    await m.react("👍")
    m.react("👎");
  })
}

module.exports.help = {
  name: "poll",
  aliases: ["vote"],
  category: "Utility"
}