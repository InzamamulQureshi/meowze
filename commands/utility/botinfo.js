const Discord = require('discord.js');
let moment = require("moment")
require ("moment-duration-format")
let days = 0;
let week = 0;

module.exports.run = async(client, message, args) => {
  
  let duration = moment.duration(client.uptime).format(`d [days], h [h], m [min], s [sec]`)
  let uptime = ``;
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  if(hours > 23) {
    days = days + 1; hours = 0; }
  if(days == 7) {
    days = 0; week = week + 1; }
  if(week > 0) {
    uptime += `${week} week, `; }
  if(minutes > 60) {
    minutes = 0; }
  uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
 
  let botembed = new Discord.MessageEmbed()
  .setColor(client.colors.theme)
  .setAuthor(`${client.user.username}`, client.user.avatarURL())
  .addField(`<:bookmark:739323532328042496> Version`,`v3.0.0 `)
  .addField(`<:rules:739323550116085792> Library`,`Discord.js`)
  .addField(`<:developer:741518183978238042> Developer`,`Qureshi Inzamamul#0833`)
  .addField(`<:m_star:752068197464801360> Helpers`, `🗲Okami🗲#5580\nAhsan#2732\nᴺᴼᵀ•тнєℓαѕтgαмєя18◥▶_◀◤#3502\nɃŁΞ 丶 R Λ J 乛॥ＩＣＸ#5931`)
  .addField(`<:count:741521358860845076> Server Count`, `${client.guilds.cache.size} servers`)
  .addField(`<:count:741521358860845076> User Count`, `${client.users.cache.size} users`)
 .addField(`<:invite:741521650855706664> Invite Me`, `Click [here](https://discordapp.com/api/oauth2/authorize?client_id=695551251798032444&permissions=8&scope=bot) to invite`)
  .addField(`<:support:741521834843045918> Support Server`, `Click [here](https://discord.gg/e7dQz7c) to join`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(`Uptime: ${duration}`);
  message.channel.send(botembed).catch(console.log)
}

module.exports.help = {
  name: "botinfo",
  aliases: ["about", "bi"],
  category: "Utility"
}