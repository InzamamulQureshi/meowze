const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let job = await client.db.get(`job_${message.author.id}`)
  let limit = await client.db.get(`limit_${message.author.id}`)
  
  if(limit === null) limit = 1000
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Meowze Bank 🏦`, message.author.avatarURL({dynamic: true}))
  .setDescription(`Some information about **Meowze Bank** this is the place where you can store your money and it will be safe in the bank no one can rob it from here and you can withdraw it from the bank whenever you want to.

**Current bank limit:**
You can only store ${limit} <:meowcoin:759993220108648509> in bank!

**Work count:**
You have worked ${job} times!

In order to increase your bank limit either you can work and increase your limit or you can spend some money and buy more storage!`)
  .setColor(client.colors.theme)
  .setFooter(`You can buy storage space from shop!`)
  
  message.channel.send(embed)
  
}

exports.help = {
  name: "bank",
  aliases: []
}