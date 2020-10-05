const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
 let spookinc = await client.db.get(`spookinc_${message.author.id}`)
 if(spookinc === null) spookinc = 0
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Halloween Event Information`, `https://cdn.discordapp.com/emojis/761444776280850472`)
  .setDescription(`Meowze Halloween event has started and will end on 2nd of November\nMany new items has been added in shop and new currency <:spookinc:761441120588267533> has been added\nYou need to participate in Meowze official servers events in order to get <:spookinc:761441120588267533>\nYou can buy Spookin Box & Spooky Potion with this <:spookinc:761441120588267533> currency\n\n**Spookin Currency -**\n${spookinc} <:spookinc:761441120588267533>\n\nYou can get <:spookinc:761441120588267533> coins by participating in the event in support server!\nClick [here](https://discord.gg/e7dQz7c) to join support server\nHowever you can still claim 2 <:spookinc:761441120588267533> daily from daily command!`)
  .setColor(client.colors.theme)
  .setFooter(`Halloween Event is a limited time event!`)
  .setThumbnail(`https://cdn.discordapp.com/emojis/761444776280850472`)
  
  message.channel.send(embed)
}

exports.help = {
  name: "halloween",
  aliases: ["event"]
}