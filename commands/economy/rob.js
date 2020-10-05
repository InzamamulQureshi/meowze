const discord = require("discord.js")
const db = require ("quick.db")
const ms = require("parse-ms")

exports.run = async(client, message, args) => {
  
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  let timeout = 900000
  if(coolpu === true) timeout = 720000
  let rob = await db.get(`rob_${message.author.id}`)
  
  if(rob !== null && timeout - (Date.now() - rob) > 0) {
    let time = ms(timeout - (Date.now() - rob))
    
    return message.channel.send(`Chill! you will get caught if you rob without planning, you can rob again in **${time.minutes}mins**, **${time.seconds}secs** you can plan within this time!`)
  }
  
   let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0])
  if(!user) return message.channel.send(`Please mention a user to rob`)
  let money = await client.db.get(`money_${message.author.id}`)
  let umoney = await client.db.get(`money_${user.id}`)
  
  if(money < 200) return message.channel.send(`You need at least 200 <:meowcoin:759993220108648509> to rob someone.`)
  if(umoney < 200) return message.channel.send(`${user.user.username} doesn't even have 200 <:meowcoin:759993220108648509>, They are not worth robbing`)

  let spookypu = await client.db.get(`spookypu_${message.author.id}`)
  let mon = ["success", "failure", "failure"]
  if(spookypu === true) mon = ["success", "failure", "success", "failure"] 
  let result = Math.floor(Math.random()*mon.length)
  
  if(mon[result] === "success") {
    
    let min = "50"
    if(spookypu === true) min = "70"
    let max = umoney
    let amount = Math.floor(Math.random()*max+min)
    let msg;
  
    if(amount > 700) msg = `got away with a big amount of ${amount} <:meowcoin:759993220108648509>`
    if(amount < 700) msg = `got away with small amount of ${amount} <:meowcoin:759993220108648509>`
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Rob Successful!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`You robbed and ${msg}`)
    .setColor(client.colors.theme)
    .setFooter(client.user.username, client.user.avatarURL())
    
    message.channel.send(embed)
    
    client.db.add(`money_${message.author.id}`, amount)
    client.db.subtract(`money_${user.id}`, amount)
    db.set(`rob_${message.author.id}`, Date.now())
    
  } else {
    
    let penalty = Math.floor(Math.random()*200)
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Rob Unsuccessful!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`You were caught and paid the police ${penalty} <:meowcoin:759993220108648509> as fine!`)
    .setColor(client.colors.theme)
    .setFooter(client.user.username, client.user.avatarURL())
    
    message.channel.send(embed)
    
    client.db.subtract(`money_${message.author.id}`, penalty)
    db.set(`rob_${message.author.id}`, Date.now())
  }
}

exports.help = {
  name: "rob",
  aliases: []
}