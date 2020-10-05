const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let amount = parseInt(args[0])
  let bank = await client.db.get(`bank_${message.author.id}`)
  
  if(amount > bank) return message.channel.send(`You cannot withdraw more than you have ._.`)
  if(args[0].includes("-")) return message.channel.send(`You cannot withdraw negative amount`)
  
  if(args[0] === "all".toLowerCase()) {
    
    if(!bank) return message.channel.send(`You don't have any money to withdraw.`)
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Successfully withdrew!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`Successfully withdew all your money`)
    .setColor(client.colors.theme)
    .setFooter(client.user.username, client.user.avatarURL())
    
    message.channel.send(embed)
    
    client.db.delete(`bank_${message.author.id}`)
    client.db.add(`money_${message.author.id}`, bank)
  } else {
    
    if(!bank) return message.channel.send(`You don't have any money to withdraw.`)
    if(!amount) return message.channel.send(`Please provide a valid amount of money to withdraw.`)
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Successfully withdrew!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`Successfully withdrew ${amount} <:meowcoin:759993220108648509>`)
    .setColor(client.colors.theme)
    .setFooter(client.user.username, client.user.avatarURL())
    
    message.channel.send(embed)
    
    client.db.add(`money_${message.author.id}`, amount)
    client.db.subtract(`bank_${message.author.id}`, amount)
  }
}

exports.help = {
  name: "withdraw",
  aliases: ["with"],
  category: "Economy"
}