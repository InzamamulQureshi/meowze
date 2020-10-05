const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
  
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions to execute the command!");
  
let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
if(!user)return message.channel.send("Mention the User who should be warned")

const warns = await client.db.get(`warns_${user.id}_${message.guild.id}`);
const warnings = await client.db.get(`warnings_${user.id}_${message.guild.id}`);
  
let reason = args.slice(1).join(' ')
if (!reason) reason = "No Reason Given"
  

let warnEmbed = new discord.MessageEmbed()
.setTitle("User Has Been Successfully Warned")
.setDescription(`${user} has been warned!`)
.addField("Reason - ", reason)
.setColor(client.colors.success)
.setFooter(`Warned by ${message.author.tag}`)
message.channel.send(warnEmbed)

var DmWarnEmbed = new discord.MessageEmbed()
.setDescription(`You were warned in ${message.guild.name} for reason: ${reason}`)
.setColor(client.colors.error)
user.send(DmWarnEmbed)

  client.db.add(`warns_${user.id}_${message.guild.id}`, 1)
  var today = new Date(); var dd = String(today.getDate()).padStart(2, '0'); var mm = String(today.getMonth() + 1).padStart(2, '0'); var yyyy = today.getFullYear(); 
let gg;
if(mm == 1) gg = "January"
else if(mm == 2) gg = "February"
else if(mm == 3) gg = "March"
else if(mm == 4) gg = "April"
else if(mm == 5)gg = "May"
else if(mm == 6)gg = "June"
else if(mm == 7)gg = "July"
else if(mm == 8) gg = "August"
else if(mm == 9)gg = "September"
else if(mm == 10) gg = "October"
else if(mm == 11)gg = "November"
else if(mm == 12)gg = "December"
today = dd + " " + gg
client.db.push(`warnings_${user.id}_${message.guild.id}`, `**Moderator: ${message.author.tag} | Date: ${today}**\n${reason}\n`)

  let modlog = await client.db.fetch(`modlog_${message.guild.id}`)
  if(modlog === null) {
    return;
}
  
    let ch = client.db.get(`modlog_${message.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Member Warned")
    .addField(`Action: `, `Warn`)
    .addField(`Victim: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .addField(`Reason: `, `${reason}`)
    .setColor(client.colors.error)
    client.channels.cache.get(ch).send(modlogembed)    

}

module.exports.help = {
  name: "warn",
  aliases: ["w"],
  category: "Moderation",
  description: "Warns the mentioned user",
  usage: "warn <@user> <reason>"
}