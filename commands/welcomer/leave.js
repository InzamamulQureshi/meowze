const discord = require('discord.js')

exports.run = async(client, message, args) => {
  
 if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${client.emotes.error} | You require \`Manage Server\` permission to use this command!`).then(message.delete({timeout: 5000}))
  
  let prefix = await client.db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  if(!args[0]) {
    
    const embed = new discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    .setDescription(`${client.emotes.error} | Invalid Arguments!\nWhat do you want to set ?\n**Available Configs -**`)
    .addField(`Leave Message`, `Usage: \`${prefix}leave message <msg>\`\nDescription: Set custom leave message`)
    .addField(`Leave Channel`, `Usage: \`${prefix}leave channel <channel>\`\nDescription: Set leave channel`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor(client.color.error)
    
    return message.channel.send(embed)
  }
  
  if(args[0] === "message") {
    
     if(args[1] === "variables".toLowerCase()) {
   
   const embed = new discord.MessageEmbed()
   .setAuthor(`Variables`, message.author.avatarURL({dynamic: true}))
   .setDescription(`You can use these variables to make your leave message more powerful!`)
   .addField(`<:msg:767991443037356064> Message Variables`, `{member} - Mentions the user\n{memberName} - Gives users username\n{memberTag} - Gives users tag\n{serverName} - Gives servers name\n{memberCount} - Gives number of members in server`)
   .addField(`<a:CatWot:709274375202930751> Emoji Variables`, `{:verified} - Gives <a:verified_white:758541634626387978> emoji\n{:welcome} - Gives <a:lazowelcome:729598728977252352> emoji\n{:welcome2} - Gives <a:lazorwelcome:740263559853899926> emoji\n{:diamond} - Gives <a:diamont:768682519641587753> emoji\n{:flowers} - Gives <a:flowers:768682919048511538> emoji\n{:brokenstar} - Gives <a:brokenstar:768684127540478002> emoji\n{:star} - Gives <a:shinystar:768684383082119208> emoji`)
   .setColor(client.color.default)
   .setFooter(client.user.username, client.user.avatarURL())
   
   return message.channel.send(embed)
 }
  
  if(args[1] === "reset") {
    
    let lm = await client.db.get(`lm_${message.guild.id}`)
    
    if(lm === null || !lm) return message.channel.send(`${client.emotes.error} | Welcome message in this guild has is already null.`)
    
    await client.db.delete(`lm_${message.guild.id}`)
    return message.channel.send(`${client.emotes.success} | Successfully reset leave message.`)
  } else {
  
  let lm = args.slice(1).join(" ")
  
  if(!lm) return message.channel.send(`${client.emotes.error} | Leave message cannot be \`null\`\nTry \`${prefix}leave message variables\` for list of available variables or use command \`${prefix}leave message reset\` to reset leave message`)
  if(lm.length >= 1000) return message.channel.send(`${client.emotes.error} | Welcome message must not contain more than 1000 characters`)
  
    await client.db.set(`lm_${message.guild.id}`, lm)
  
  return message.channel.send(`${client.emotes.success} | Welcome message has been set to:\n\`\`\`${lm}\`\`\``)
  }
  }
  if(args[0] === "channel") {
    let lc = await client.db.get(`lc_${message.guild.id}`)
  
  if(args[1] === "reset") {
    
    if(lc === null) return message.channel.send(`${client.emotes.error} | This server already does not have any leave channel.`)
    
   await client.db.delete(`lc_${message.guild.id}`)
    
    return message.channel.send(`${client.emotes.success} | Successfully disabled leave channel`)
    
  }
    
     let arg = args.slice(1).join(" ")
  
  let channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === arg) || message.guild.channels.cache.find(c => c.id === arg)
  if(!channel) return message.channel.send(`${client.emotes.error} | Please mention a valid channel or give a valid channel name or ID`)
  
   client.db.set(`lc_${message.guild.id}`, channel.id)
  
  message.channel.send(`${client.emotes.success} | Leave channel set to <#${channel.id}>.`)
  }
}

exports.help = {
  name: "leave_config",
  aliases: ["leave"],
  category: "Welcomer"
}