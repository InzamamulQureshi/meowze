const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0]) || message.member;
  let money = await client.db.get(`money_${user.user.id}`);
  let bank = await client.db.get(`bank_${user.user.id}`);
  let job = await client.db.get(`job_${user.user.id}`)
  let limit = await client.db.get(`limit_${message.author.id}`)
  
 if(limit === null) client.db.set(`limit_${message.author.id}`, 1000)
  if(limit === null) limit = 1000
  
  if(!money) money = 0;
  if(!bank) bank = 0;
  if(job === 10) client.db.add(`limit_${message.author.id}`, 2000)
  if(job === 20) client.db.add(`limit_${message.author.id}`, 4000)
  if(job === 50) client.db.add(`limit_${message.author.id}`, 8000)
  if(job === 75) client.db.add(`limit_${message.author.id}`, 10000)
  if(job === 100) client.db.add(`limit_${message.author.id}`, 15000)
  
  
  let total = bank+money;
  
  const embed = new discord.MessageEmbed()
  .setAuthor(`${user.user.username}'s Balance`, user.user.displayAvatarURL({dynamic: true}))
  .setDescription(`**<:cash:751371033973489674> Cash**: ${money} <:meowcoin:759993220108648509>\n**<:bankbal:751374517632499772> Bank**: ${bank}/${limit} <:meowcoin:759993220108648509>\n**<a:economy:751371265121452072> Total Currency**: ${total} <:meowcoin:759993220108648509>`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username, client.user.avatarURL())
  message.channel.send(embed).catch(console.log)
}

exports.help = {
  name: "balance",
  aliases: ["bal"],
  category: "Economy"
}