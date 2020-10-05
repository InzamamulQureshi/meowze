const discord = require('discord.js')
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async(client, message, args) => {
   
  let timeout = 300000
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  if(coolpu === true) timeout = 240000
  let search = await db.get(`search_${message.author.id}`)
  
  if(search !== null && timeout - (Date.now() - search) > 0) {
    let time = ms(timeout - (Date.now() - search))
   
    return message.channel.send(`Chill, You can search again in **${time.minutes}mins**, **${time.seconds}secs**`)
  }
  
  let money = await client.db.get(`money_${message.author.id}`)
  let bank = await client.db.get(`bank_${message.author.id}`)
  let spookypu = await client.db.get(`spookyp_${message.author.id}`)
  let coin = Math.floor(Math.random()*50)
  if(spookypu === true) coin = Math.floor(Math.random()*60)
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Found Something!`, message.author.avatarURL({dynamic: true}))
  .setDescription(`You searched and found ${coin} <:meowcoin:759993220108648509>`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username, client.user.avatarURL())
  
  client.db.add(`money_${message.author.id}`, coin)
  db.set(`search_${message.author.id}`, Date.now())
  
  return message.channel.send(embed)
}

exports.help = {
  name: "search",
  aliases: [],
  category: "Economy"
}