const discord = require("discord.js")
const { registerFont, createCanvas, loadImage } = require("canvas")
const Canvas = require("canvas")
module.exports = async(client, member) => {
  
  let lc = await client.db.get(`lc_${member.guild.id}`)
  
  if(!lc) {
    return;
  }
  
  let msg = await client.db.get(`lm_${member.guild.id}`)
  if(msg === null) msg = `<a:Romeo:767330477668565002> Goodbye! {memberTag}, It was nice to have you in **{serverName}** <a:Juliet:767330603661000745>
<a:diamont:768682519641587753> Hope you will enjoyed your stay with us! <a:diamont:768682519641587753>`
  
  let lm = msg.replace(`{member}`, member)
  lm = lm.replace(`{memberName}`, member.user.username)
  lm = lm.replace(`{memberTag}`, member.user.tag)
  lm = lm.replace(`{memberCount}`, member.guild.members.cache.size)
  lm = lm.replace(`{serverName}`, member.guild.name)
  lm = lm.replace(`{:diamond}`, `<a:diamont:768682519641587753>`)
  lm = lm.replace(`{:welcome}`, `<a:lazowelcome:729598728977252352>`)
  lm = lm.replace(`{:star}`, `<a:shinystar:768684383082119208>`)
  lm = lm.replace(`{:verified}`, `<a:verified_white:758541634626387978>`)
  
  let font = await client.db.get(`font_${member.guild.id}`)
  if(font === null) font = "Neuterous"
  
   registerFont(`assest/fonts/${font}.otf`, {
  family: `${font}`
});
  //registerFont("ChunkFive-Regular.otf", { family: 'ChunkFive' })
  
  let img = await loadImage(`https://cdn.discordapp.com/attachments/768391902356832256/769395661632045057/PicsArt_10-24-08.33.24.jpg`)
  let av = await loadImage(member.user.displayAvatarURL({format: 'png', size: 2048}))
  
  const canvas = createCanvas(700, 280)
  const ctx = canvas.getContext('2d')
  
  let size = 210
  
  if(member.user.tag.length > 20) size = 180
  if(font === "Neuterous") {
    size = 185
    if(member.user.tag.length <= 10) size = 240
    if(member.user.tag.length > 20) size = 140
  }
  
  let size2 = 268
  if(font === "Mikan") { 
    size = 220
    size2 = 285
    if(member.user.tag.length <= 10) size = 265
    if(member.user.tag.length > 20) size = 210
  }
  
  if(font === "Samureix") {
    size = 225
    size2 = 290
    if(member.user.tag.length <= 10) size = 260
    if(member.user.tag.length > 20) size = 190
  }
  
  if(font === "ChunkFive-Regular") {
   if(member.user.tag.length <= 10) size = 250
  }

  ctx.font = `30px ${font}`
  ctx.fillStyle = "BLACK"
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  ctx.fillText(`WELCOME`, size2, 230)
  ctx.fillText(`${member.user.tag}`, size, 270)
  ctx.beginPath()
  ctx.arc(350, 100, 90, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(av, 250, 0, 200, 200);
  
  const attach = new discord.MessageAttachment(canvas.toBuffer(), "leave.png")
  client.channels.cache.get(lc).send(lm, attach).catch(console.log)
  
}