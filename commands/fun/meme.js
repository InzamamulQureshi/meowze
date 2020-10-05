const Discord = require('discord.js')
const api = require("imageapi.js")


module.exports.run = async(client,message,args) => {
        let subreddits = [        
            "memes", 
            "dankmemes",
            "Memes_Of_The_Dank"
        ]
        let subreddit = subreddits[Math.floor(Math.random()*subreddits.length)]
        let img = await api(subreddit)
        let Embed = new Discord.MessageEmbed()
        .setTitle(`A meme from ${subreddit}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setColor(client.colors.theme)
        .setImage(img)
        message.channel.send(Embed).catch(console.log)
    }

module.exports.help = {
    name: "meme",
    aliases: ["Meme", "MEME"],
    description: "Get a meme!",
    category: "Fun"
}