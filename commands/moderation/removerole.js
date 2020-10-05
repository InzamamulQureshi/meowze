const discord = require("discord.js")
const config = require ("../../config.json")

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission to use this command")
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require `Manage Role` to remove roles")
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!user) {
    return message.channel.send("Please mention a valid user to remove their role!")
  }
  
  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" ")) || message.guild.roles.cache.find(r => r.id === args[1])
  if(!role) {
    return message.channel.send("Please mention the role/provide role name to remove!")
  }
  
  if(!user.roles.cache.has(role.id)) {
    return message.channel.send("That user does not have that role!")
  }
  
  await user.roles.remove(role.id);
  message.channel.send(`Successfully removed ${role.name} role from ${user.user.username}`)
  
}

module.exports.help = {
name: "removerole",
aliases: ["rr"],
category: "Moderation"
}