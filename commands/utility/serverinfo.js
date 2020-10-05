const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
      let sEmbed = new Discord.MessageEmbed()
        .setColor(client.colors.theme)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("**Guild ID**", `${message.guild.id}`, true)
        .addField("**Channel Count**", `${message.guild.channels.cache.size} channels`)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
        .setFooter(`${client.user.username}`, client.user.avatarURL());
    message.channel.send(sEmbed);
}

module.exports.help = {
  name: "serverinfo",
  aliases: ["Serverinfo", "SERVERINFO"],
  category: "Utility"
}