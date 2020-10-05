const discord = require ('discord.js')

module.exports.run = async(client, message, args) => {
let reason = message.content.split(' ').slice(2).join(' ');
     let guild = message.guild;
     let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || args[0]
   
    if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`You Require \`BAN MEMBERS\` Permission to Execute this Command`)
        }
   
   if (!args[0]) {
            return message.channel.send("You need to Mention Someone to Ban")
        }
   
    if (message.author.id === user.id) {
            return message.channel.send("You Cannot Ban Yourself, Please Mention Someone Else")
        }
   
     if (!reason) {
            reason = "No Reason Given"
        }
   
     if (!message.guild.member(user).bannable) {
            return message.channel.send("That Member Couldnt be Banned Due to Role Hierarchy")
        }
   
    guild.members.ban(user);
   
       let embed = new discord.MessageEmbed()
    .setTitle("User was Successfully Banned")
    .setDescription(`${user.username}#${user.discriminator} was banned by ${message.author.username}`)
    .addField(`Reason -`, `${reason}`)
    .setColor(client.colors.theme)
    message.channel.send(embed).catch(console.log)
    
     let DmEmbed = new discord.MessageEmbed()
    .setDescription(`You were Banned in ${guild} by ${message.author.username}`)
    .addField(`Reason -`, `${reason}`)
    .setColor(client.colors.theme)
     user.send(DmEmbed)
  
  let modlog = await client.db.get(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Member Banned")
    .addField(`Action: `, `Ban`)
    .addField(`Victim: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .setColor(client.colors.error)
    client.channels.cache.get(ch).send(modlogembed).catch(console.log)
}

module.exports.help = {
  name: "ban",
  aliases: ["blacklist"],
  category: "Moderation",
  description: "Bans The Mentioned user",
  usage: "ban <userID> | ban <@user>"
}