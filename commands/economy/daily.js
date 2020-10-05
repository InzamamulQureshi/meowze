const discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

exports.run = async (client, message, args) => {
 
  let timeout = 43200000
  let daily = await db.get(`daily_${message.author.id}`)
  
  if(daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily))
    
    return message.channel.send(`You have already claimed your daily, come back again in **${time.hours}hours**, **${time.minutes}mins**, **${time.seconds}secs**`)
  }
  
  
  client.dbl.hasVoted(message.author.id).then(voted => {
    if(voted) {
     
      const embed = new discord.MessageEmbed()
      .setAuthor(`Daily claimed!`, message.author.avatarURL({dynamic: true}))
      .setDescription(`You claimed your daily and got 200 <:meowcoin:759993220108648509> and 1 <:spookinc:761441120588267533>`)
      .setColor(client.colors.theme)
      .setFooter(client.user.username, client.user.avatarURL())
       
     client.db.add(`money_${message.author.id}`, 200)
     client.db.add(`spookinc_${message.author.id}`, 1)
            db.set(`daily_${message.author.id}`, Date.now())
      
      return message.channel.send(embed)
    }
    else {
   
      const embed = new discord.MessageEmbed()
      .setAuthor(`Disclaimer!`, message.author.avatarURL({dynamic: true}))
      .setDescription(`You must vote before you claim your daily\nClick [here](https://top.gg/bot/695551251798032444/vote) to vote\nNote: It takes 1-5 minutes for your vote to get registered`)
      .setColor(client.colors.theme)
      .setFooter(`You can vote every 12 hours`)
      
      return message.channel.send(embed)
    }
  })
}

exports.help = {
  name: "daily",
  aliases: [],
  category: "Economy"
}