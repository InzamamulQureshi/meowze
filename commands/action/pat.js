const discord = require("discord.js")
const fetch = require("node-fetch")
const db = require("enhanced.db")

exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0])
  
  if(!user) return message.channel.send(`Please mention a user to pat`).then(m => m.delete({timeout: 4000}))

  if(user.id === message.author.id) return message.channel.send(`${message.author.username} do you need friends ?... you can pat me i can be your friend`)
  if(user.user.username === message.author.username) return message.channel.send(`${message.author.username} do you need friends ?... you can pat me i can be your friend`)
  
  let string = [`${message.author.username} pats ${user.user.username}`, `${message.author.username} pats ${user.user.username} :)`, `${message.author.username} pets ${user.user.username} aww ><`]
  let title = string[Math.floor(Math.random() * string.length)];
  
 let url = await fetch("https://nekos.life/api/pat").then(res => res.json()).then(body => {
   
    const embed = new discord.MessageEmbed()
    .setAuthor(title, message.author.avatarURL({dynamic: true}))
    .setImage(body.url)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("0000")
   
    message.channel.send(embed).catch(console.log)
    
  }) 
}


exports.help = {
  name: "pat",
  aliases: [],
  category: "Action"
}
