const discord = require("discord.js");
const config = require("../../config.json");
const superagent = require("superagent");


module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send("Please mention the User to be Muted")
    }
    
    if(user.id === message.author.id) {
      return message.channel.send("You cant Mute Youself");
    }
    
  if(user.hasPermission(["ADMINISTRATOR"]) || !message.guild.owner) {
    return message.channel.send({
      embed: new discord.MessageEmbed()
      .setDescription(`**${user.user.tag}** is immune to mute`)
      .setColor(client.colors.theme)
                                })
  }
  
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      reason = "No Reason Given"
    }
    
    
    let muterole = message.guild.roles.cache.find(m => m.name === "Muted")
    
    
      if(!muterole)return message.channel.send("This server does not have the `Muted` role, Create one and try again")
    
    
    
   if(user.roles.cache.has(muterole.id))return message.channel.send(`${user.user.tag} is already muted`).catch(console.log)
    
    
  
    
    
    user.roles.add(muterole)
  
    let embed = new discord.MessageEmbed()
    .setTitle(`${user.user.tag} Was Successfully Muted`)
    .setDescription(`Muted By: ${message.author.tag}
Reason: ${reason}`)
    .setColor(client.colors.success)
    
 message.channel.send(embed).catch(console.log)
  
    let modlog = await client.db.get(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = await client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Member Muted")
    .addField(`Action: `, `Mute`)
    .addField(`Victim: `, `${user.user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .addField(`Reason: `, `${reason}`)
    .setColor(client.colors.error)
    client.channels.cache.get(ch).send(modlogembed)
}

module.exports.help = {
  name: "mute",
  aliases: [],
  category: "Moderation",
  description: "Mutes the mentioned user",
  usage: "mute <@user> | mute <user-id>"
}