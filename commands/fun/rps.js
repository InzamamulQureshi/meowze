const db = require("quick.db")
const config = require("../../config.json")

module.exports.run = async(client, message, args) => {
      
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = config.d_prefix
        if (message.content.indexOf(prefix) !== 0) return;

    const arg = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = arg.shift()

    if (command === 'rps') {
        let replies = ['rock', 'paper', 'scissors'];
        let result = Math.floor((Math.random() * replies.length));

        let uReply = arg[0];
        if (!uReply) return message.channel.send(`Please play with one of these responses: \`${replies.join(', ')}\``).catch(console.log)
        if (!replies.includes(uReply)) return message.channel.send(`Only these responses are accepted: \`${replies.join(', ')}\``).catch(console.log)

        if (replies[result] === uReply) {
            console.log(replies[result]);
            return message.channel.send('It\'s a tie! We had the same choice.').catch(console.log)
        } else if (uReply === 'rock') {
            console.log(replies[result]);
            if (replies[result] === 'paper') return message.channel.send('I won! I chose Paper!').catch(console.log)
            else return message.channel.send('You won! I chose scissors :(').catch(console.log)
        } else if (uReply === 'scissors') {
            console.log(replies[result]);
            if (replies[result] === 'rock') return message.channel.send('I won! I chose Rock!').catch(console.log)        
          else return message.channel.send('You won! I chose scissors :(').catch(console.log)
        } else if (uReply === 'paper') {
            console.log(replies[result]);
           if (replies[result] === 'scissors') return message.channel.send('I won! I chose Scissors!');
            else return message.channel.send('You won! I chose rock :(').catch(console.log)
        }
    }
}

module.exports.help = {
  name: "rps",
  aliases: ["rockpaperscizors"],
  category: "Fun"
}