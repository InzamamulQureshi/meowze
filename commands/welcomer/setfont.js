let discord = require("discord.js")
const client = new discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]})

exports.run = async(client, message, args) => {
 
  if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${client.emotes.error} | You require \`Manage Messages\` permission to use this command`)
  
  let msg = await message.channel.send(`${message.author}`)
  
  try {
    
    const embed = new discord.MessageEmbed()
    .setAuthor(`Welcomer Font`, message.author.avatarURL({dynamic: true}))
    .setDescription(`*React with ❌ to reset font*\n*React with given emojis to set font*\n\nAvailable Fonts :-\n**1️⃣ ChunkFive**\n**2️⃣ Neuterous**\n**3️⃣ Mikan**\n**4️⃣ Samureix**`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor(client.color.default)
  await msg.edit(embed)
  await msg.react("1️⃣")
  await msg.react("2️⃣")
  await msg.react("3️⃣")
  await msg.react("4️⃣")
  await msg.react("❌")
    
   const filter = (reaction, user) => (reaction.emoji.name === "1️⃣" || reaction.emoji.name === "2️⃣" || reaction.emoji.name === "3️⃣" || reaction.emoji.name === "4️⃣" || reaction.emoji.name === "❌") && (user.id === message.author.id)
    msg.awaitReactions(filter, {max: 1}).then(async collected => {
      
      if(collected.first().emoji.name === "1️⃣") {
      
        client.db.set(`font_${message.guild.id}`, `ChunkFive-Regular`)
        message.channel.send(`${client.emotes.success} | Font has been successfully set to ChunkFive-Regular`)
        msg.reactions.removeAll()
      }
      if(collected.first().emoji.name === "2️⃣") {
        
        client.db.set(`font_${message.guild.id}`, `Neuterous`)
        message.channel.send(`${client.emotes.success} | Font has been successfully set to Neuterous`)
        msg.reactions.removeAll()
      }
      if(collected.first().emoji.name === "3️⃣") {
        
        client.db.set(`font_${message.guild.id}`, `Mikan`)
        message.channel.send(`${client.emotes.success} | Font has been successfully set to Mikan`)
        msg.reactions.removeAll()
      }
      if(collected.first().emoji.name === "4️⃣") {
        
        client.db.set(`font_${message.guild.id}`, `Samureix`)
        message.channel.send(`${client.emotes.success} | Font has been successfully set to Samureix`)
        msg.reactions.removeAll()
      }
      if(collected.first().emoji.name === "❌") {
        
       await client.db.delete(`font_${message.guild.id}`)
        message.channel.send(`${client.emotes.success} | Font has been successfully reset`)
        msg.reactions.removeAll()
      }
    })
    setTimeout(async () => {
      await msg.reactions.removeAll()
    }, 60000)
  } catch(error) {
    return message.channel.send(error)
  }
}
exports.help = {
  name: "font",
  aliases: ["welcomefont"],
  category: "Welcomer"
}