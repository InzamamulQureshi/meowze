const discord = require("discord.js")
const ms = require("parse-ms")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  let timeout = 3600000
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  if(coolpu === true) timeout = 2880000
  let money = await client.db.get(`money_${message.author.id}`)  
  let work = await db.get(`work_${message.author.id}`)
  let job = await client.db.get(`job_${message.author.id}`)
  let coin = 150
 
  if(money === null) money = 0
  if(!job) coin = 200
  if(job === 20) coin = 300
  if(job === 50) coin = 500
  if(job === 75) coin = 700
  if(job === 100) coin = 1000
  
  if(work !== null && timeout - (Date.now() - work) > 0) {
    let time = ms(timeout - (Date.now() - work))
    
    return message.channel.send(`You can work again in **${time.hours}**h, **${time.minutes}**mins, **${time.seconds}**secs`).catch(console.log)
 } if(!job) {
    
   const embed = new discord.MessageEmbed()
   .setAuthor(`Work Done!`, message.author.avatarURL({dynamic: true}))
   .setDescription(`You worked for first time and gained ${coin} <:meowcoin:759993220108648509>!`)
   .setColor(client.colors.theme)
   .setFooter(`Work to again in 1h to gain more money!`, client.user.avatarURL()) 
  
   client.db.add(`money_` + message.author.id, coin).catch(console.log)
   client.db.add(`job_${message.author.id}`, 1) .catch(console.log)
  db.set("work_" + message.author.id, Date.now())
   
   message.channel.send(embed)
   
} if(job) {
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Work Done!`, message.author.avatarURL({dynamic: true}))
  .setDescription(`You worked and gained ${coin} <:meowcoin:759993220108648509>`)
  .setColor(client.colors.theme)
  .setFooter(`Work again in 1h to gain more money!`, client.user.avatarURL())
  
  client.db.add(`job_${message.author.id}`, 1)
  client.db.add(`money_${message.author.id}`, coin)
  db.set("work_" + message.author.id, Date.now())  
  
 return message.channel.send(embed)
  
}
}

exports.help = {
  name: "work",
  aliases: [],
category: "Economy"
}