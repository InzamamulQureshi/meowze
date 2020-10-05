const discord = require('discord.js')

exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0])
  if(!user) return message.channel.send(`Please mention a user to pay.`)
  let money = await client.db.get(`money_${message.author.id}`)
  let umoney = await client.db.get(`money_${user.id}`)
  let amount = parseInt(args[1])
  if(amount > money) return message.channel.send(`You cannot pay more than you have ._.`)
  if(!amount) return message.channel.send(`Please provide a valid amount to pay`)
  if(args[1].includes("-")) return message.channel.send(`You cannot pay negative amount of money`)
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Successfully Payed!`)
  .setDescription(`Successfully transferred your ${amount} <:meowcoin:759993220108648509> to ${user.user.username}`)
  .setColor(client.colors.theme)
  .setFooter(`Payment done by ${message.author.username}`)
  
  message.channel.send(embed)
  client.db.subtract(`money_${message.author.id}`, amount)
  client.db.add(`money_${user.id}`, amount)
}

exports.help = {
  name: "pay",
  aliases: [],
  category: "Economy"
}