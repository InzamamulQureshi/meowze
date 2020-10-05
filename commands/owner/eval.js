const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }

  const cargs = message.content.split(" ").slice(1);
  if (message.author.id !== config.ownerID) return;
  try {
    const code = cargs.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    const embeed = new Discord.MessageEmbed()
      .setTitle("Input")
      .setDescription(`\`\`\`${cargs}\`\`\``)
      .addField(`Output`, clean(evaled), { code: "xl" })
      .setColor("FFBc61")
      .setFooter("Made By Qureshi Inzamamul#0833");
    message.channel.send(embeed);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Input")
      .setDescription(`\`\`\`${cargs}\`\`\``)
      .addField("Output", `ERROR\`\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor("FFB6c1")
      .setFooter("Made By Qureshi Inzamamul#0833");
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "eval",
  aliases: ["evaluate"],
  category: "Secret",
  description: "Test Ur Codes",
  usage: "eval <your code>"
};
