const discord = require("discord.js")

module.exports = async(client, m,  newM) => {
  if(m.author.bot)return;
  client.editsnipe.set(m.channel.id, {
   content: m.content,
   sender: m.author.id
   });
  
  let user = m.author
  if(user.bot)return;
  let chn = m.channel
  let modlog = await client.db.get(`modlog_${m.guild.id}`);
  if(modlog === null) { return; }
  let ch = await client.db.get(`modlog_${m.guild.id}`);
  let modlogembed = new discord.MessageEmbed()
  .setTitle("Message Edited")
  .setDescription(`Edited in: ${chn}\nMessage Author: ${m.author.tag}\nPrevious Text: ${m}\nEdited Text: ${newM}`)
  .setColor(client.colors.theme)
  .setFooter(`User ID: ${m.id} | Message ID: ${newM.id}`)
  client.channels.cache.get(ch).send(modlogembed).catch(console.log)
}