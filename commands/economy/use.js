const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
   let spookinb = await client.db.get(`spookin_b_${message.author.id}`)
   let spookyp = await client.db.get(`spooky_p_${message.author.id}`)
   let coolp = await client.db.get(`cool_p_${message.author.id}`)
   let coolb = await client.db.get(`cool_g_${message.author.id}`)
   let coolpu = await client.db.get(`coolpu_${message.author.id}`)
   let spookypu = await client.db.get(`spookypu_${message.author.id}`)
  
  if(args.join(" ") === "Spooky Potion") {
    
  if(spookyp === null) return message.channel.send(`${client.emotes.error} You need to buy Spooky Potion for using it! ${client.emotes.error}`) 
  if(spookypu === true) return message.channel.send(`Spooky Potion is already in use! Use it after the current potions effect wears off!`)
    
    message.channel.send(`You are now using your spooky potion!\nYour luck has been increased by 20%!\nNote: Spooky Potions effect will wear off after 24hours`)
    
    client.db.set(`spookypu_${message.author.id}`, true)
    client.db.subtract(`spooky_p_${message.author.id}`, 1)
   
    setTimeout(async() => {
      message.author.send(`24hours of your spooky potion has been completed!`)
      await client.db.delete(`spookypu_${message.author.id}`)
    }, 86400000)
  } 
  else if(args.join(" ") === "Cool Potion") {
    
    if(coolp === null) return message.channel.send(`${client.emotes.error} You need to buy Cool Potion for using it! ${client.emotes.error}`)
    if(coolpu === true) return message.channel.send(`Cool potion is already in use! Use it after the current potions effect wears off!`)
    
    message.channel.send(`You are now using your cool potion!\nCooldowns of commands has been decreased by 20%!\nNote: Cool Potion's effects will wear off after 24hours`)
    
    client.db.set(`coolpu_${message.author.id}`, true)
    client.db.subtract(`cool_p_${message.author.id}`, 1)
    
    setTimeout (async() => {
     await client.db.delete(`coolpu_${message.author.id}`) 
      message.author.send(`24hours of your Cool Potion has been completed`)
    }, 86400000)
  }
  else if(args.join(" ") === "Spookin Box") {
    
    if(spookinb === null) return message.channel.send(`${client.emotes.error} You need to buy Spookin Box for using it! ${client.emotes.error}`)
    
    let amount = Math.floor(Math.random()* (7000 - 3000 + 1) + 3000)
    let badge = "<:spookin:761444776280850472> Badge"
    let list = [amount, amount, amount, amount, amount, amount, amount, amount, amount, badge]
    let reward = list[Math.floor(Math.random()*list.length)]
    
    if(reward === amount) {
    message.channel.send(`Opening Spookin Box....`).then(m => {
      setTimeout(async() => {
        await m.edit(`You found ${reward} <:meowcoin:759993220108648509>!!`).catch(console.log)
      }, 4000)
    })
      client.db.subtract(`spookin_b_${message.author.id}`, 1)
      client.db.add(`money_${message.author.id}`, reward)
    }
    if(reward === badge) {
      message.channel.send(`Opening Spookin Box....`).then(m => {
        setTimeout (async() => {
          await m.edit(`You found ${reward}!! Congratulations!! :tada::tada:`)
        }, 4000)
      })
      client.db.set(`spookinb_${message.author.id}`, true)
      client.db.subtract(`spookin_b_${message.author.id}`)
    }
  }
  else if(args.join(" ") === "Cool Gift") {
    
    if(coolb === null) return message.channel.send(`${client.emotes.error} You need to buy Cool Gift for using it! ${client.emotes.error}`)
    
    let amount = Math.floor(Math.random()* (12000 - 8000 + 1) + 8000)
    let rep = "10 Rep <:cat_Heart:758529418355277834> Points!"
    let spookinc = "10 <:spookinc:761441120588267533>"
    let list = [amount, amount, amount, amount, amount, amount, amount, rep, rep, amount, spookinc]
    let reward = list[Math.floor(Math.random()*list.length)]

    if(reward === amount) {
      message.channel.send("Opening Cool Gift...").then(m => {
        setTimeout(async() => {
       await m.edit(`You found ${reward} <:meowcoin:759993220108648509> in Cool Box!!`).catch(console.log)
        }, 4000)
      })
      client.db.add(`money_${message.author.id}`, amount)
      client.db.subtract(`cool_g_${message.author.id}`, 1)
    }
    
    if(reward === rep) {
      message.channel.send(`Opening Cool Gift...`).then(m => {
        setTimeout(async() => {
          await m.edit(`You found ${reward} in Cool Box!!`).catch(console.log)
        }, 4000)
      })
      client.db.add(`rep_${message.author.id}`, 10)
      client.db.subtract(`cool_g_${message.author.id}`, 1)
    }
    if(reward === spookinc) {
      message.channel.send(`Opening Cool Gift...`).then(m => {
        setTimeout(async() => {
          await m.edit(`You found ${reward} in Cool Box! Congratulations!!`).catch(console.log)
        }, 4000)
      })
      client.db.add(`spookinc_${message.author.id}`, 10)
      client.db.subtract(`cool_g_${message.author.id}`, 1)
    }
  }
}

exports.help = {
  name: "use",
  aliases: ["u"]
}