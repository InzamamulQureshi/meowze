const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (client, message, args) => {
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/meow");
  
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Cat`, message.author.avatarURL({dynamic: true}))
    .setImage(body.url) 
  .setColor(client.colors.theme)
    message.channel.send(embed)
};

 module.exports.help = {
    name: 'cat',
   aliases: ["meow"],
 category: "Fun"
  }