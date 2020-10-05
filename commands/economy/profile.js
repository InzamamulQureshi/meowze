const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0]) || message.member
  let bank = await client.db.get(`bank_${user.user.id}`)
  let money = await client.db.get(`money_${user.user.id}`)
  let job = await client.db.get(`job_${user.user.id}`)
  let limit = await client.db.get(`limit_${user.user.id}`)
  let devbadge = await client.db.get(`devbadge_${user.user.id}`)
  let modbadge = await client.db.get(`modbadge_${user.user.id}`)
  let boostbadge = await client.db.get(`boostbadge_${user.user.id}`)
  let badge = await client.db.get(`badge_${user.user.id}`)
  let rep = await client.db.get(`rep_${user.user.id}`)
  let repb = await client.db.get(`repb_${user.user.id}`)
  let spookinc = await client.db.get(`spookinc_${user.user.id}`)
  let spookinb = await client.db.get(`spookinb_${user.user.id}`)
  
  if(spookinc === null) spookinc = 0
  if(bank === null) bank = 0
  if(money === null) money = 0
  if(job === null) job = 0
  if(limit === null) limit = 1000
  if(rep === null) rep = 0
  if(rep === 100) {
    client.db.set(`repb_${user.user.id}`, true)
  }
  
  if(client.config.staff.includes(user.user.id)) {
  
    devbadge = ""
    modbadge = "\n<:lazotility:705697359895724044> - Official Staff"
    repb = "\n<:cat_paws:752035748286431292> - Reputated"
    spookinb = "\n<:spookin:761444776280850472> - Spooky Badge"
    badge = "" 
    if(user.user.id === "690132996195745872") {
      devbadge = "\n<:dev_badge:760697082918731867> - Official Dev"
    }
    
  } if(!client.config.staff.includes(user.user.id)) {
    
    devbadge = ""
    modbadge = ""
    if(repb === null) client.db.add(`badge_${user.user.id}`, 1)
    if(repb === null) repb = ""
    if(spookinb === null) client.db.add(`badge_${user.user.id}`, 1)
    if(spookinb === null) spookinb = ""
    if(badge >= 2) badge = "None" 
    if(badge >= 2) repb = "" 
    if(badge >= 2) spookinb = ""
    if(badge === null) badge = ""
    if(repb === true) repb = "\n<:cat_paws:752035748286431292> - Reputated"
    if(repb === true) badge = ""
    if(repb === true) client.db.delete(`badge_${user.user.id}`)
    if(spookinb === true) spookinb = "\n<:spookin:761444776280850472> - Spooky Badge"
    if(spookinb === true) badge = ""
    if(spookinb === true) client.db.delete(`badge_${user.user.id}`) 
  }
  
  const embed = new discord.MessageEmbed()
  .setAuthor(user.user.username + `'s Profile`, user.user.avatarURL({dynamic: true}))
  .addField(`<:cash:751371033973489674> Cash:`, `${money} <:meowcoin:759993220108648509>`)
  .addField(`<:spookin:761444776280850472> Spookin Currency:`, `${spookinc} <:spookinc:761441120588267533>`)
  .addField(`<:bankbal:751374517632499772> Bank:`,`${bank}/${limit} <:meowcoin:759993220108648509>`)
  .addField(`<:rules:739323550116085792> Work Count:`, `${job} times`)
  .addField(`<:faq:708640284724166766> Badges:`, `${devbadge}${modbadge}${repb}${spookinb}${badge}`)
  .addField(`<:cat_Heart:758529418355277834> Reputation:`, `${rep} points`)
  .setColor(client.colors.theme)
  .setThumbnail(message.guild.iconURL({dynamic: true}))
  .setFooter(client.user.username, client.user.avatarURL())
  
  message.channel.send(embed).catch(console.log)
  
}

exports.help = {
  name: "profile",
  aliases: ["pf"],
category: "Economy"
}