const Discord = require('discord.js') 

module.exports.run = async (client, message, args) => {
    
        let user = message.mentions.users.first();
        let reasonkick = message.content.split(' ').slice(2).join(' ');
        let guild = message.guild;
        let memberkick = message.guild.member;
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You Require \`KICK MEMBERS\` Permission to Execute this Command`)
    
     if (message.mentions.users.size < 1) {
            return message.channel.send('You need to mention someone to kick!');
        }
    
     if (!reasonkick) {
            reasonkick = "No Reason Given"
        }
    
    if (!message.guild.member(user).kickable) {
            return message.channel.send("That Member Couldnt be Kicked Due to Role Hierarchy");
        }
    
    message.guild.member(user).kick();
    
    let embed = new Discord.MessageEmbed()
    .setTitle("User Was Successfully Kicked")
    .setDescription(`${user.username}#${user.discriminator} was kicked by ${message.author.username}`)
    .addField(`Reason :-`, `${reasonkick}`)
    .setColor(client.colors.theme)
    message.channel.send(embed)
    
     let DmEmbed = new Discord.MessageEmbed()
    .setDescription(`You were Kicked from ${guild} by ${message.author.username}`)
    .addField(`Reason -`, `${reasonkick}`)
    .setColor(client.colors.theme)
    user.send(DmEmbed)
  
    let modlog = await client.db.get(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = await client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new Discord.MessageEmbed()
    .setTitle("Member Kicked")
    .addField(`Action: `, `Kick`)
    .addField(`Victim: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .addField(`Reason: `, `${reasonkick}`)
    .setColor(client.colors.error)
    client.channels.cache.get(ch).send(modlogembed)
  }

module.exports.help = {
	name: "kick",
  aliases: ["kickout"],
  category: "Moderation",
  description: "Kicks the mentioned user",
  usage: "kick @user | kick id"
}