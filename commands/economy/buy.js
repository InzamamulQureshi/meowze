const discord = require ('discord.js')

exports.run = async(client, message, args) => {
  
 if(!args) return message.channel.send(`Please provide item name to buy!`)
  
  let prefix = await client.db.get(`prefix_${message.author.id}`)
  if(prefix === null) prefix = client.config.d_prefix

  let cool_p = await client.db.get(`cool_p_${message.author.id}`)
  let cool_g = await client.db.get(`cool_g_${message.author.id}`)
  let spookin_b = await client.db.get(`spookin_b_${message.author.id}`)
  let spooky_p = await client.db.get(`spooky_p_${message.author.id}`)
  let money = await client.db.get(`money_${message.author.id}`)
  let spookinc = await client.db.get(`spookinc_${message.author.id}`)
  
  if(args.join(" ") === "Spookin Box") {
    
    if(spookinc === null) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to buy this item!`)
    if(spookinc < 50) return message.channel.send(`Yoy don't have enough <:spookinc:761441120588267533> to buy this item!`)
    
    message.channel.send(`You have successfully purchased Spookin Box <:spookin:761444776280850472>\nUse command \`${prefix}use Spookin Box\` to use it`)
    
    client.db.subtract(`spookinc_${message.author.id}`, 50)
    client.db.add(`spookin_b_${message.author.id}`, 1)
  } 
  if(args.join(" ") === "Spooky Potion") {
    
    if(spookinc < 20) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to buy this item!`)
    if(spookinc === null) return message.channel.send(`You don't have enough <:spookinc:761441120588267533> to buy this item!`)
    
    message.channel.send(`You have successfully purchased Spooky Potion <:halloween_p:761455236471586816>\nUse command \`${prefix}use Spooky Potion\` to use the potion!`)
    
   client.db.add(`spooky_p_${message.author.id}`, 1) 
    client.db.subtract(`spookinc_${message.author.id}`, 20)
  }
  if(args.join(" ") === "Cool Potion") {
    
    if(money < 7000) return message.channel.send(`You don't have enough <:meowcoin:759993220108648509> to buy this item!`)
    
    message.channel.send(`You have successfully purchased Cool Potion <:cool_p:761076864894369803>\nUse command \`${prefix}use Cool Potion\` to use the potion!`)
   
    client.db.add(`cool_p_${message.author.id}`, 1)
    client.db.subtract(`money_${message.author.id}`, 7000)
  }
  if(args.join(" ") === "Cool Gift") {
    
    if(money < 10000) return message.channel.send(`You don't have enough <:meowcoin:759993220108648509> to purchase this item!`)
    
    message.channel.send(`You have successfully purchased Cool Gift <:coolgift:753538564351983618>\nUse command \`${prefix}use Cool Gift\` to use the potion!`)
    
    client.db.add(`cool_g_${message.author.id}`, 1)
    client.db.subtract(`money_${message.author.id}`, 10000)
  }
  if(!args.includes("Spooky Potion" || "Spookin Box" || "Cool Potion" || "Cool Gift")) return message.channel.send(`Could not find that item in shop! Use the perfect name provided in shop`)
}

exports.help = {
  name: "buy",
  aliases: []
}