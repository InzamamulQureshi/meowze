module.exports.run = async(client, message, args) => {
 
  let choose = ['heads', 'tails'];
  if(!args[0]) return message.channel.send("Please choose `Heads` or `Tails`")
   if (!choose.includes(args[0])) return message.channel.send(`Only these responses are accepted: \`${choose.join(', ')}\``).catch(console.log)
  let random = Math.floor(Math.random() * choose.length);
  if(args[0] === "heads") {
    if(choose[random] === "tails") return message.channel.send("I won i chose tails").catch(console.log)
    if(choose[random] === "heads") return message.channel.send("I lost i chose heads").catch(console.log)
   } else if(args[0] === "tails") {
    if(choose[random] === "heads") return message.channel.send("I lost i chose heads").catch(console.log)
    if(choose[random] === "tails") return message.channel.send("I won i chose tails").catch(console.log)
   }
  
}

module.exports.help = {
  name: "coinflip",
  aliases: ["cf", "flip"],
  category: "Fun"
}