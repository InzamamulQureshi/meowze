const discord = require("discord.js")
const fetch = require('node-fetch')
const db = require("quick.db")


exports.run = async (client, message, args) => {
  
 let str = `${message.author.username} is happy!
${message.author.username} has a grin.
${message.author.username} is smiling :D`
 let string = str.split("\n")
 let title = string[Math.floor(Math.random()*string.length)]
  
  let wink = await fetch(`https://waifu.pics/api/sfw/happy`).then(res => res.json()).then(body => {
  
  const embed = new discord.MessageEmbed()
  .setAuthor(title, message.author.avatarURL({dynamic: true}))
  .setColor("0000")
  .setImage(body.url)
  .setFooter(client.user.username, client.user.avatarURL())
  
  message.channel.send(embed).catch(console.log)
    
  })
  }
                                                                                          

exports.help = {
  name: "smile",
  aliases: ["happy"],
  category: "Action"
};
