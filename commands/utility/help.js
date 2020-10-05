const discord = require("discord.js")
const config = (require("../../config.json"))

module.exports.run = async(client, message, args) => {
 
  let prefix = await client.db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = config.d_prefix
  
  let utility = [];
  let moderation = [];
  let giveaways = [];
  let action = [];
  let fun = [];
  let economy = [];
 
  
  client.commands.filter(cmd => cmd.help.category === "Utility").forEach(cmd => utility.push(cmd.help.name));
  
  client.commands.filter(cmd => cmd.help.category === "Moderation").forEach(cmd => moderation.push(cmd.help.name));
  
  client.commands.filter(cmd => cmd.help.category === "Giveaways").forEach(cmd => giveaways.push(cmd.help.name));
  
  client.commands.filter(cmd => cmd.help.category === "Action").forEach(cmd => action.push(cmd.help.name));
  
  client.commands.filter(cmd => cmd.help.category === "Fun").forEach(cmd => fun.push(cmd.help.name));
  
  client.commands.filter(cmd => cmd.help.category === "Economy").forEach(cmd => economy.push(cmd.help.name));
    
  let em = new discord.MessageEmbed()
  .setColor(client.colors.theme)
  .setAuthor(message.author.username, message.author.avatarURL())
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  
  if(!args[0]) {
  const embed = new discord.MessageEmbed()
  .setAuthor(`${client.user.username}'s Commands`, message.author.avatarURL({dynamic: true}))
  .setThumbnail(client.user.avatarURL())
  .addField(`<:rules:739323550116085792> | Utility`, `${prefix}help utility, See all the **Utility** commands available.`, true)
  .addField(`<:moderation:751371159517397124> | Moderation`, `${prefix}help moderation, See all the **Moderation** commands available.`, true)
  .addField(`<:giveaway:751371206023970867> | Giveaways`, `${prefix}help giveaways, See all the **Giveaways** commands available.`, true)
  .addField(`<:action:751371117003800637> | Action`, `${prefix}help action, See all the **Action** commands available.`, true)
  .addField(`<:welcomer:751370986695163918> | Welcomer`, `${prefix}help welcomer, See all the **Welcomer** commands available.`, true)
  .addField(`<:fun:751371340271058974> | Fun`, `${prefix}help fun, See all the **Fun** commands available.`, true)
  .addField(`<a:economy:751371265121452072> | Economy`, `${prefix}help economy, See all the **Economy** commands available.`, true)
   .setColor(client.colors.theme);
  message.channel.send(embed).catch(console.log);
  } else if(args[0] === 'utility'.toLowerCase()) {
    em.addField(`<:rules:739323550116085792> | Utility Commands`, "``" + prefix + utility.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } else if(args[0] === "moderation".toLowerCase()) {
    em.addField(`<:moderation:751371159517397124> | Moderation Commands`,  "``" + prefix + moderation.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } else if(args[0] === "giveaways".toLowerCase()) {
    em.addField(`<:giveaway:751371206023970867> | Giveaway Commands`,  "``" + prefix + giveaways.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } else if(args[0] === "action".toLowerCase()) {
    em.addField(`<:action:751371117003800637> | Action Commands`,  "``" + prefix + action.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } else if(args[0] === "fun".toLowerCase()) {
    em.addField(`<:fun:751371340271058974> | Fun Commands`,  "``" + prefix + fun.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } else if(args[0] === "economy".toLowerCase()) {
    em.addField(`<a:economy:751371265121452072> | Economy Commands`,  "``" + prefix + economy.join(`\`\`, \`\`${prefix}`) + "``")
    message.channel.send(em);
  } 
}

module.exports.help = {
  name: "help",
  aliases: ["h"],
category: "Utility" 
}