const discord = require("discord.js")
const fetch = require("node-fetch")
const db = require("enhanced.db")

exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0])
  
  if(!user) return message.channel.send(`Please mention a user to bully`).then(m => m.delete({timeout: 4000}))

  if(user.id === message.author.id) return message.channel.send(`${message.author.username} eh!! how can you bully yourself?`)
  if(user.user.username === message.author.username) return message.channel.send(`${message.author.username} ehh!! how can you bully yourself?`)
  
  let string = [`${message.author.username} bullies ${user.user.username}`, `${message.author.username} bullies ${user.user.username} :(`, `${message.author.username} bullies ${user.user.username} xd`]
  let title = string[Math.floor(Math.random() * string.length)];
  
 let url = await fetch("https://waifu.pics/api/sfw/bully").then(res => res.json()).then(body => {
   
    const embed = new discord.MessageEmbed()
    .setAuthor(title, message.author.avatarURL({dynamic: true}))
    .setImage(body.url)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("0000")
   
    message.channel.send(embed).catch(console.log)
    
  }) 
}


exports.help = {
  name: "bully",
  aliases: [],
  category: "Action"
}
