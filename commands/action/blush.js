const discord = require("discord.js")
const fetch = require('node-fetch')
const db = require("quick.db")


exports.run = async (client, message, args) => {
  
 let str = `${message.author.username} blushes!
${message.author.username} is shy! >< 
${message.author.username} blushes 0//0`
 let string = str.split("\n")
 let title = string[Math.floor(Math.random()*string.length)]
  
  let wink = await fetch(`https://waifu.pics/api/sfw/blush`).then(res => res.json()).then(body => {
  
  const embed = new discord.MessageEmbed()
  .setAuthor(title, message.author.avatarURL({dynamic: true}))
  .setColor("0000")
  .setImage(body.url)
  .setFooter(client.user.username, client.user.avatarURL())
  
  message.channel.send(embed).catch(console.log)
    
  })
  }
                                                                                          

exports.help = {
  name: "blush",
  aliases: [],
  category: "Action"
};
