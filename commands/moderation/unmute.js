const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to remove roles!")
  
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send({
        embed: new discord.MessageEmbed()
        .setDescription("Please mention the user to be unmuted")
        .setColor(client.colors.error)
    });
    }
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!user.roles.cache.has(muterole.id)) {
      return message.channel.send(`${user.user.tag} is not muted`).catch(console.log)
    }
    
    
    user.roles.remove(muterole.id)
    
  let embed = new discord.MessageEmbed()
    .setTitle(`${user.user.tag} Was Successfully Unmuted`)
    .setDescription(`Unmuted By: ${message.author.tag}`)
    .setColor(client.colors.theme)
    
 message.channel.send(embed).catch(console.log)
  
    let modlog = await client.db.get(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Member Unmuted")
    .addField(`Action: `, ``)
    .addField(`User: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .setColor(client.colors.success)
    client.channels.cache.get(ch).send(modlogembed).catch(console.log)
}

module.exports.help = {
  name: "unmute",
  aliases: ["Unmute", "UNMUTE"],
  category: "Moderation"
}