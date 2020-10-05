const discord = require("discord.js")
const db = require("quick.db")
const ms = require ('parse-ms')

exports.run = async(client, message, args) => {
   
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  let timeout = 30000
  if(coolpu === true) timeout = 24000
  let gamble = await db.get(`gamble_${message.author.id}`)
 
  if(gamble !== null && timeout - (Date.now() - gamble) > 0) {
    let time = ms(timeout - (Date.now() - gamble))
    
    return message.channel.send(`You can gamble again in **${time.minutes}mins**, **${time.seconds}secs**`)
    
  }
  
  let money = await client.db.get(`money_${message.author.id}`)
  let color = args[0]
  let amount = parseInt(args[1])
  
  if(!color) return message.channel.send(`Please choose anyone color [ Red, Blue or Green ]`)
  if(amount > money) return message.channel.send(`You cannot gamble more than you have.`)
  if(amount < 100) return message.channel.send(`You must gamble at least 100 <:meowcoin:759993220108648509>`)
  if(args[1].includes("-")) return message.channel.send(`You cannot gamble negative amount`)
  
  let ran = ["red", "blue", "green"]
  let random = Math.floor(Math.random()* ran.length)
  
  if(!ran.includes(color)) return message.channel.send(`Only Red, blue or green is accepted!`).catch(console.log)
  if(!amount) return message.channel.send(`Please provide a valid amount of money to gamble`)
  
  if(ran[random] === color) {
  
    message.channel.send(`Congratulations! You won and got ${amount*2}`).catch(console.log)
    client.db.add(`money_${message.author.id}`, amount*2)
    db.set(`gamble_${message.author.id}`, Date.now())
    
  } else {
    
    message.channel.send(`You lost it all... ._.`).catch(console.log)
    
    client.db.subtract(`money_${message.author.id}`, amount)
    db.set(`gamble_${message.author.id}`, Date.now())
    
  }
}

exports.help = {
  name: "gamble",
  aliases: [],
  category: "Economy"
}