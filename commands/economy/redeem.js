const discord = require("discord.js")
const db = require ('quick.db')
const ms = require ('parse-ms')

exports.run = async(client, message, args) => {
  
  let spookinc = await client.db.get(`spookinc_${message.author.id}`)
  let prefix = await client.db.get(`prefix_${message.author.id}`)
  if(prefix === null) prefix = client.config.d_prefix
  if(spookinc === null) spookinc = 0
 
 let timeout = 2332800000
 let now = await db.get(`event_${client.user.id}`)
 
 if(now !== null && timeout - (Date.now() - now) > 0) {
   let time = ms(timeout - (Date.now() - now)) 
   var timer = `**${time.days}days**, **${time.hours}hours**, **${time.minutes}minutes**`
}
  

  if(!args[0]) {
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Halloween Redemption`, client.user.avatarURL())
    .setDescription(`Collect <:spookinc:761441120588267533> to redeem the following items -\nYour current spooky balance is ${spookinc} <:spookinc:761441120588267533>`)
    .addField(`<:spookin:761444776280850472> Spookin Box`, `Required Amount: 50 <:spookinc:761441120588267533>\nTime Remaining: ${timer}\nDo \`${prefix}redeem Spookin Box\` to redeem!`)
    .addField(`<:halloween_p:761455236471586816> Spooky Potion`, `Required Amount: 20 <:spookinc:761441120588267533>\nTime Remaining: ${timer}\nDo \`${prefix}redeem Spooky Potion\` to redeem!`) 
    .addField(`<:meowcoin:759993220108648509> Meow Coins`, `Required Amount: 10 <:spookinc:761441120588267533>\nPerk - Gives 5000 <:meowcoin:759993220108648509>\nTime Remaining: ${timer}\nDo \`${prefix}redeem coins\` to redeem!`)
    .addField(`<:spookin:761444776280850472> Spooky Badge`, `Required Amount: 200 <:spookinc:761441120588267533>\nPerk - Get Spooky Badge on your Meowze profile\nTime Remaining: ${timer}\nDo \`${prefix}redeem badge\` to redeem!`)
    .setThumbnail(`https://cdn.discordapp.com/emojis/761444776280850472.png`)
    .setColor(client.colors.theme)
    .setFooter(`Redemption list for Halloween event`)
    
    message.channel.send(embed).catch(console.log)
    
    db.set(`event_${client.user.id}`, Date.now())
  } 
  if(args[0] === "coins") {
    
    if(spookinc < 10) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to redeem coins!`)
    
    message.channel.send(`You successfully claimed your 5000 <:meowcoin:759993220108648509>\nUse command \`${prefix}bal\` to check your balance!`)
    
    client.db.add(`money_${message.author.id}`, 5000)
    client.db.subtract(`spookinc_${message.author.id}`, 10)  
  }
  if(args.join(" ") === "Spookin Box") {
   
    if(spookinc < 50) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to redeem Spookin Box!`).catch(console.log)
    
    message.channel.send(`You successfully claimed your <:spookin:761444776280850472> Spookin Box\nUse command \`${prefix}inv\` to check your inventory!`).catch(console.log)
    
    client.db.add(`spookin_b_${message.author.id}`, 1)
    client.db.subtract(`spookinc_${message.author.id}`, 50)
  }
  if(args.join(" ") === "Spooky Potion") {
    
    if(spookinc < 20) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to redeem Spooky Potion!`)
   
    message.channel.send(`You successfully claimed your <:halloween_p:761455236471586816> Spooky Potion\nUse command \`${prefix}inv\` to check your inventory!`)
   
    client.db.add(`spooky_p_${message.author.id}`, 1)
    client.db.subtract(`spookinc_${message.author.id}`, 20)
  } 
  if(args.join(" ") === "badge") {
   
    if(spookinc < 200) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to redeem Spooky Badge!`)
    
    message.channel.send(`You successfully claimed your <:spookin:761444776280850472> Spooky Badge\nUse command \`${prefix}profile\` to check the badge!`)
    
    client.db.set(`spookinb_${message.author.id}`, true)
    client.db.subtract(`spookinc_${message.author.id}`, 200)
  }
  db.set(`event_${client.user.id}`, Date.now())
}

exports.help = {
  name: "redeem",
  aliases: []
}