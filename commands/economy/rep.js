const discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async(client, message, args) => {
  
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  let timeout = 86400000
  if(coolpu === true) timeout = 69120000
  let repp = await db.get(`rep_${message.author.id}`)
  
  if(repp !== null && timeout - (Date.now() - repp) > 0) {
    let time = ms(timeout - (Date.now() - repp))
    
   return message.channel.send(`You can only give rep to a person in one day! you can give rep again in **${time.hours}hours**, **${time.minutes}mins**, **${time.seconds}secs**`) 
  } 
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0]) 
  
  if(!user) return message.channel.send(`Please mention a user to give rep to.`)
  if(user.user.id === message.author.id) return message.channel.send(`You cannot give rep to yourself .-.`)
  
  let rep = await client.db.get(`rep_${user.user.id}`)
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`Reputation!`, message.author.avatarURL({dynamic: true}))
  .setDescription(`You gave reputation to ${user.user.username} <:cat_Heart:758529418355277834>`)
  .setColor(client.colors.theme)
  .setFooter(`${user.user.username} you got reputation from ${message.author.username}`, user.user.avatarURL({dynamic: true}))
  
  message.channel.send(embed)
  
  client.db.add(`rep_${user.user.id}`, 1)
  db.set(`rep_${message.author.id}`, Date.now())
}

exports.help = {
  name: "rep",
  aliases: ["reputation"]
}