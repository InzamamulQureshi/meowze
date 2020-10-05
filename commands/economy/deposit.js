const discord = require('discord.js')

exports.run = async(client, message, args) => {
  
  let money = await client.db.get(`money_${message.author.id}`)
  let job = await client.db.get(`job_${message.author.id}`)
  let bank = await client.db.get(`bank_${message.author.id}`) 
  let limit = await client.db.get(`limit_${message.author.id}`)
  let amount = parseInt(args[0])
  let bankk = limit-bank
  
  if(!money) money = 0;
  if(!bank) bank = 0;
  if(bank === limit) return message.channel.send(`Your bank is full! you cannot deposit anymore money in bank\nYou can increase your bank limit by working`)   
  if(amount > bankk) return message.channel.send(`You don't have enough space in bank to deposit ${amount} <:meowcoin:759993220108648509>`) 
  if(amount > money) return message.channel.send(`You cannot deposit more than you have .-.`)
  if(args[0].includes("-")) return message.channel.send(`You cannot deposit negative amount`)
  
 if(args[0] === "all".toLowerCase()) {
   
   let bal;
   if(money > limit) bal = bankk
   if(money === limit) bal = money
   if(money < limit) bal = money
   if(money === 0) return message.channel.send(`You cannot deposit empty balance`)
    
   
    const embed = new discord.MessageEmbed()
    .setAuthor(`Successfully Deposited!`, message.author.avatarURL({dymamic: true}))
    .setDescription(`Successfully deposited all your money`)
    .setColor(client.colors.theme)
    .setFooter(`You cannot deposit more than the limit of bank`)
    
    message.channel.send(embed)
    
    client.db.add(`bank_${message.author.id}`, bal)
    client.db.subtract(`money_${message.author.id}`, bal)
 } else {
   
   if(!amount) return message.channel.send(`Please provide a valid amount of money to deposit`)
   if(amount === 0) return message.channel.send(`\`0\` ?? you cannot deposit 0 coins`)
   
   const embed = new discord.MessageEmbed()
   .setAuthor(`Successfully Deposited!`, message.author.avatarURL({dynamic: true}))
   .setDescription(`Successfully deposited ${amount} <:meowcoin:759993220108648509>`)
   .setColor(client.colors.theme)
   .setFooter(`You can increase limit of bank by working!, Use command m!help bank to get more information.`)
   
   message.channel.send(embed)
   
   client.db.add(`bank_${message.author.id}`, amount)
   client.db.subtract(`money_${message.author.id}`, amount) 
 }
}
 

exports.help = {
  name: "deposit",
  aliases: ["dep"],
  category: "Economy"
}