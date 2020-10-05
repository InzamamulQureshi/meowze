const discord = require("discord.js")
const fetch = require("node-fetch")
const db = require("enhanced.db")


exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0])
  
  if(!user) return message.channel.send(`Please mention a user to kiss`).then(m => m.delete({timeout: 4000}))

  if(user.id === message.author.id) return message.channel.send(`Uhh, how can you kiss yourself ?`)
  if(user.user.username === message.author.username) return message.channel.send(`Uhh, how can you kiss yourself ?`)
  
  let string = [`${message.author.username} kisses ${user.user.username}`, `${message.author.username} kisses ${user.user.username} ^//^`, `${user.user.username} got kissed by ${message.author.username}`]
  let title = string[Math.floor(Math.random() * string.length)];
  
 let url = await fetch("https://waifu.pics/api/sfw/kiss").then(res => res.json()).then(body => {
   
    const embed = new discord.MessageEmbed()
    .setAuthor(title, message.author.avatarURL({dynamic: true}))
    .setImage(body.url)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("0000")
   
    message.channel.send(embed).catch(console.log)
    
  }) 
}


exports.help = {
  name: "kiss",
  aliases:[],
  category: "Action"
}