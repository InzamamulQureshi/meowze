const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
 let user = message.mentions.members.first() || message.guild.members.cache.find(c => c.user.username === args.join(" ")) || message.guild.members.cache.find(m => m.user.id === args[0]) || message.member
 
  let cool_g = await client.db.get(`cool_g_${user.user.id}`)
  let cool_p = await client.db.get(`cool_p_${user.user.id}`)
  let spooky_p = await client.db.get(`spooky_p_${user.user.id}`)
  let spookin_b = await client.db.get(`spookin_b_${user.user.id}`)
  let coolg;
  let coolp;
  let spookyp;
  let spookinb;
  
  if(cool_g === null) {
    coolg = "Purchase Required"
    cool_g = 0
  }
  if(cool_p === null) {
    coolp = "Purchase Required"
    cool_p = 0
  }
  if(spooky_p === null) {
    spookyp = "Purchase Required"
    spooky_p = 0
  }
  if(spookin_b === null) {
    spookinb = "Purchase Required"
    spookin_b = 0
  }
  
  if(cool_g >= 1) coolg = "Purchased"
  if(cool_p >= 1) coolp = "Purchased"
  if(spooky_p >= 1) spookyp = "Purchased"
  if(spookin_b >= 1) spookinb = "Purchased"
  
  const embed = new discord.MessageEmbed()
  .setTitle(user.user.username + "'s Inventory", message.author.avatarURL({dynamic: true}))
  .setDescription(`In inventory you can see information of items you have purchased and of those which you did not purchase`)
  .addField(`<:spookin:761444776280850472> Spookin Box`, `Item Status: ${spookinb}\nItem Amount: ${spookin_b}`)
  .addField(`<:coolgift:753538564351983618> Cool Gift`, `Item Status: ${coolg}\nItem Amount: ${cool_g}`)
  .addField(`<:halloween_p:761455236471586816> Spooky Potion`, `Item Status: ${spookyp}\nItem Amount: ${spooky_p}`)
  .addField(`<:cool_p:761076864894369803> Cool Potion`, `Item Status: ${coolp}\nItem Amount: ${cool_p}`)
  .setColor(client.colors.theme)
  .setFooter(client.user.username, client.user.avatarURL())
  
  message.channel.send(embed)
  
}

exports.help = {
  name: "inventory",
  aliases: ["inv"],
  category: "Economy"
}