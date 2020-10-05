const discord = require("discord.js")
const config = require ("../../config.json")

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this command")
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I need `Manage Roles` permission to add role to users ")
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!user) {
    return message.channel.send("Please mention a valid user to give role to!")
  }
  
  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" ")) || message.guild.roles.cache.find(r => r.id === args[1])
  if(!role) {
    return message.channel.send("Please provide role name to add!")
  }
  
  if(user.roles.cache.has(role.id)) {
    return message.channel.send("That user already has that role!")
  }
  
  await user.roles.add(role.id);
  message.channel.send(`Successfully added ${role.name} role to ${user.user.username}`)
  
}

module.exports.help = {
name: "addrole",
aliases: [],
  category: "Moderation"
}