const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let guild = message.guild;
  let user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
      args[0];
    //client.users.cache.get(args[0]);

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(
      `You Require \`BAN MEMBERS\` Permission to Execute this Command`
    );
  }

  if (!user)
    return message.channel.send("You need to Provide A Valid User ID to Unban");

  guild.members.unban(user);

  let embed = new discord.MessageEmbed()
    .setTitle("User was Successfully Unbanned")
    .setDescription(`<@${user}> was unbanned`)
    .setColor(client.colors.theme);
  message.channel.send(embed).catch(console.log);

  let modlog = await client.db.get(`modlog_${message.guild.id}`);
  if (modlog === null) {
    return;
  }

  let ch = client.db.get(`modlog_${message.guild.id}`);

  let modlogembed = new discord.MessageEmbed()
    .setTitle("Member Unbanned")
    .addField(`Action: `, `Unban`)
    .addField(`User: `, `${user.tag}`)
    .addField(`Moderator: `, `${message.author.tag}`)
    .setColor(client.colors.success);
  client.channels.cache.get(ch).send(modlogembed);
};

module.exports.help = {
  name: "unban",
  aliases: ["whitelist"],
  category: "Moderation",
  description: "Unbans The Mentioned user",
  usage: "unban <userID> | unban <@user>"
};

