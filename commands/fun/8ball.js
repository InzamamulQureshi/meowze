const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!args[0])
    return message.reply("Please ask a question to the 8ball :8ball:");
  let string = `
        Maybe.
	    Certainly not.
	    I hope so.
	    Not in your wildest dreams.
    	There is a good chance.
	    Quite likely.
    	I think so.
    	I hope not.
    	I hope so.
    	Never!
    	Hell, yes.
    	Hell, no.
	    I would rather not say.
    	Who cares?
    	Possibly.
    	Never, ever, ever.
    	There is a small chance.
    	Yes!
    	lol no.
    	Not my problem.
        Ask someone else.`;
  let replies = string.split("\n");
  let answer = Math.floor(Math.random() * replies.length);
  let question = args.slice(0).join(" ");

  let embed = new Discord.MessageEmbed()
    .setColor(client.colors.theme)
    .addField("Question:", question)
    .addField("Answer:", replies[answer]);

  message.channel.send(embed);
};

module.exports.help = {
  name: "8ball",
  aliases: [],
  category: "Fun"
};

