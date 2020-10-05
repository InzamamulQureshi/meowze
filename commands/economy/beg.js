const discord = require('discord.js')
const ms = require("parse-ms")
const db = require ('quick.db')

exports.run = async(client, message, args) => {
 
  let money = await client.db.get(`money_${message.author.id}`)
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  let timeout = 600000
  if(coolpu === true) timeout = 480000
  let beg = await db.get(`beg_${message.author.id}`)
  let spookypu = await client.db.get(`spookyp_${message.author.id}`)
  let coins = Math.floor(Math.random()*50)
  if(spookypu === true) coins = Math.floor(Math.random()*60)
  let be = `Begging gives you random money from 1-50
You can beg every 10 minutes`
  let ben = be.split("\n")
  let begg = ben[Math.floor(Math.random()*ben.length)]
  
  if(beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg))
    
    return message.channel.send(`Chill!, you won't become rich by begging\nYou can beg again in **${time.minutes}**mins, **${time.seconds}**secs`)
  }
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Begged`, message.author.avatarURL({dynamic: true}))
  .setDescription(`You were begging and a rich man gave you ${coins} <:meowcoin:759993220108648509>!`)
  .setColor(client.colors.theme)
  .setFooter(begg)
  
  db.set("beg_" + message.author.id, Date.now())
  client.db.add(`money_${message.author.id}`, coins)
  
  message.channel.send(embed).catch(console.log)
  
}

exports.help = {
  name: "beg",
  aliases: [],
  category: "Economy"
}