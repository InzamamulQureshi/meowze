const discord = require("discord.js")


module.exports = async(client, s) => {
  client.snipe.set(s.channel.id, {
    content: s.content,
    sender: s.author.id
  })
  let c;
  if(s.content.length <= 0)c = "None"
  else c = s.content
  let user = s.author
if(user.bot)return;
let chn = s.channel
  let modlog = await client.db.get(`modlog_${s.guild.id}`)
  if(modlog === null) {
    return;
  }
  let attach;
if(s.attachments && s.attachments.map(x => x)[0]){
attach = s.attachments.map(x => x)[0].proxyURL
  }else if (!attach ) attach = "None"
  
    let ch = await client.db.get(`modlog_${s.guild.id}`);
    
    let modlogembed = new discord.MessageEmbed()
    .setTitle("Message Deleted")
    .setDescription(`Deleted In: ${chn}\nText Author: ${s.author.tag}\nDeleted Text: ${c}\nAttachment: ${attach}`)
    .setColor(client.colors.theme)
    .setFooter(`User ID: ${s.author.id} | Message ID: ${s.id}`)
    client.channels.cache.get(ch).send(modlogembed).catch(console.log)
  
}