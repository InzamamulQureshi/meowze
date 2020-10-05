const discord = require("discord.js")

exports.run = async(client, message, args) => {

  
  let prefix = await client.db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.d_prefix
  
  if(!args[0]) {
    
  const embed = new discord.MessageEmbed()
  .setAuthor(`Meowze Shop`, message.author.avatarURL({dynamic: true}))
  .setDescription(`Welcome to **Meowze shopping centre** here you will find many items some are cheap and some are expensive!`)
  .addField(`<:meow_gift:709983569342103572> Gift Centre:`, `Use command \`${prefix}shop gifts\` for more information`)
  .addField(`<:o_potion:752095773373628507> Potion Centre:`, `Use command \`${prefix}shop potions\` for more information`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username, client.user.avatarURL())
  
  message.channel.send(embed)
  }
  
  if(args[0] === "gifts".toLowerCase()) {
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Gift Centre!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`Welcome to **Gift centre** here you will find gifts that you can purchase! to buy a gift box use command \`${prefix}buy <item name>\``)
    .addField(`<:spookin:761444776280850472> Spookin Box -`, `Cost: 50 <:spookinc:761441120588267533>\nPerks - You can get random amount of Meowze coin within 7k and if you are lucky you can also get the <:spookin:761444776280850472> badge!`)
    .addField(`<:coolgift:753538564351983618> Cool Gift -`, `Cost: 10000 <:meowcoin:759993220108648509>\nPerks - You can get random amount of Meowze coin within 10k you can also get random amount of rep! You might also get 10 <:spookinc:761441120588267533> if you are lucky!`)
    .setColor(client.colors.theme)
    .setFooter(`Use command \`${prefix}halloween\` for more information about Halloween coin`)
    .setThumbnail(`https://cdn.discordapp.com/emojis/761444776280850472.png`)
    
    return message.channel.send(embed)
    
  } if(args[0] === "potions") {
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Potion Centre!`, message.author.avatarURL({dynamic: true}))
    .setDescription(`Welcome to **Potion centre** here you will find mysterious potions with mysterious powers that you can purchase! to buy a potion use command \`${prefix}buy <item name>\``)
    .addField(`<:halloween_p:761455236471586816> Spooky Potion -`, `20 <:spookinc:761441120588267533>\nPerks - This spooky potion boosts up your luck by 20%\nNote: This potion's effect wears off after 24hours.`)
    .addField(`<:cool_p:761076864894369803> Cool Potion -`, `Cost: 7000 <:meowcoin:759993220108648509>\nPerks - This cool potion reduces cooldown by 20%\nNote: This potion's effect wears off after 24hours.`)
    .setThumbnail(`https://cdn.discordapp.com/emojis/761455236471586816.png`)
    .setColor(client.colors.theme)
    .setFooter(`Use command \`${prefix}halloween\` for more information about Halloween coin`)
    
   return message.channel.send(embed)
    
  }
}

exports.help = {
  name: "shop",
  aliases: ["shopping"],
  category: "Economy"
}