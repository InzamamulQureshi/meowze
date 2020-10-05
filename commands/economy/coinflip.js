const discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async(client, message, args) => {
 
  let coolpu = await client.db.get(`coolpu_${message.author.id}`)
  let timeout = 30000
  if(coolpu === true) timeout = 24000
  let cf = await db.get(`cf_${message.author.id}`)
  
  if(cf !== null && timeout - (Date.now() - cf) > 0) {
    let time = ms(timeout - (Date.now() - cf))
    
    return message.channel.send(`You can flip coin again after **${time.minutes}mins**, **${time.seconds}secs**`)
  } 
  let money = await client.db.get(`money_${message.author.id}`)
  let amount = parseInt(args[1])
  let spookypu = await client.db.get(`spookyu_${message.author.id}`)
  let ran = ["heads", "tails", "heads", "tails", "heads", "tails"]
  if(spookypu === true) ran = ["heads", "heads", "tails", "tails", "heads", "tails", "heads"]
  let random = ran[Math.floor(Math.random()*ran.length)];
 
  if(!ran.includes(args[0])) return message.channel.send(`Only heads or tails is accepted.`)
  if(!amount) return message.channel.send(`Please provide a valid amount of money to bet`)
  if(amount > money) return message.channel.send(`You cannot bet more than you have`)
  if(args[1].includes("-")) return message.channel.send(`You cannot bet negative money`)
  
  if(random === args[0]) {
    
    message.channel.send(`You chose ${args[0]}\nFlipping coin... <:flip:760371409054072842>`).then(m => {
      
      setTimeout(() => {
        
        m.edit(`You chose ${args[0]}\nYou won and got ${amount+amount} <:meowcoin:759993220108648509>`)
        
      }, 4000)  
      
      client.db.add(`money_${message.author.id}`, amount+amount)
      db.set(`cf_${message.author.id}`, Date.now())
})   
} else {

  message.channel.send(`You chose ${args[0]}\nFlipping coin... <:flip:760371409054072842>`).then(m => {
   
    setTimeout(() => {
    
      m.edit(`You chose ${args[0]}\nYou lost it all ._.`)
      
    }, 4000)
    
    client.db.subtract(`money_${message.author.id}`, amount)
    db.set(`cf_${message.author.id}`, Date.now())
})
}
}

exports.help = {
  name: "coinflip",
  aliases: ["cf"],
  category: "Economy"
}