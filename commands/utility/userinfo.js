const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
 let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.author;
  let joined = message.member.joinedAt.toDateString() || member.joinedAt.toDateString()
  let status;
        if (member.presence.status === 'online') {
            status = 'Online';
        } else if (member.presence.status === 'dnd') {
            status = 'Do Not Disturb';
        } else if (member.presence.status === 'idle') {
            status = 'Idle';
        } else if (member.presence.status === 'offline') {
            status = 'Offline';
        };
     let stat;
        if (member.presence.status === 'offline') {
            stat = 0x000000;
        } else if (member.presence.status === 'online') {
            stat = 0x00AA4C;
        } else if (member.presence.status === 'dnd') {
            stat = 0x9C0000;
        } else if (member.presence.status === 'idle') {
            stat = 0xF7C035;
        };
  
  let game;
        if (member.presence.game === null) {
            game = 'Not currently Playing.';
        };
  
   let uEmbed = new discord.MessageEmbed()
        .setColor(client.colors.theme)
        .setTitle(`${member.username}'s Info`)
        .addField("**✦╎Username:**", `${member.tag}`, true)
        .addField("**✦╎ID:**", `${member.id}`, true)
        .addField("**✦╎Status:**", status)
        .addField("**✦╎Joined This Server At**", joined)
        .addField("**✦╎Joined Discord At:**", `${member.createdAt.toDateString()}`, true)
        .setThumbnail(member.avatarURL({dynamic: true}))
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp();

    message.channel.send(uEmbed).catch(console.log)
    }

module.exports.help = {
  name: "userinfo",
  aliases: ["Userinfo", "USERINFO", "whois", "Whois", "ui"],
  category: "Utility"
}