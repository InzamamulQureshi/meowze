const figlet = require('figlet')
const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
if(!args[0])return message.channel.send("Please Input A Text To Transform Into Ascii Form")
const maxlen = 100
if(args.join(" ").length > maxlen) return message.channel.send("Write something less then 100 words")
  
figlet(`${args.join(" ")}`, function (err, data){
      message.channel.send(`${data}`, {code: 'AsciiArt'});

})

}

module.exports.help = {
name: "ascii",
aliases: ["asciiart", "Ascii", "ASCII"],
category: "Fun"
}
 