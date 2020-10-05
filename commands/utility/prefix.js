const discord = require('discord.js')
const config = require("../../config.json")


module.exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You require `Administrator` Permission to execute this command!")
if(!args[0]) {
  return message.channel.send("Please Provide a prefix that you would like to set the bot prefix to.")
}
  if(args[1]) {
    return message.channel.send("You cannot set prefix to a double argument")
  }
  if(args[0].length > 3) {
    return message.channel.send("You cannot set prefix of more than 3 characters")
  }
  if(args.join("") === config.d_prefix) {
    client.db.delete(`prefix_${message.guild.id}`)
    return await message.channel.send("Successfully Reseted Prefix <:agree:739346140369256529>")
  }
  client.db.set("prefix_" + message.guild.id, args[0])  
  await message.channel.send(`<:announcement:751670048485146685> Prefix has been successfully set to \`${args[0]}\` <:announcement:751670048485146685>`)
}

module.exports.help = {
name: "prefix",
aliases: ["setprefix", "set-prefix"],
  category: "Utility"
}