const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send("You do not have enough permission to use this command")
    
    let modlog = message.mentions.channels.first()
    if(args[0] == "reset") {
      let log = await client.db.get(`modlog_${message.guild.id}`)
      if(log === null) return message.channel.send(`Modlog hasn't been set`)
      message.channel.send("Modlog has been reset")
      client.db.set(`modlog_${message.guild.id}`, null)
    }
    if(!modlog) {
      return message.channel.send("Please Mention the Channel first")
    }
    
    client.db.set(`modlog_${message.guild.id}`, modlog.id)
  
  message.channel.send(`Successfully Set The Modlog Channel to ${modlog}`)
}

module.exports.help = {
  name: "setmodlogchannel", 
  aliases: ["Setmodlogchannel", "SETMODLOGCHANNEL", "setmdc", "Setmdc", "SETMDC", "modlog"],
  category: "Moderation"
}