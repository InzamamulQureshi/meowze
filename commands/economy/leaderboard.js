const discord = require("discord.js")

exports.run = async(client, message, args) => {
  
 let money = await client.db.startsWith("money_", { sort: ".data" })
  let content = ""

  for (let i = 0; i < money.length; i++) {
    let user = client.users.cache.get(money[i].ID.split('_')[1]).username
    content += `${i+1}. ${user} - ${money[i].data} \n`;
  }
  
  let bank = await client.db.startsWith("bank_", { sort: ".data" })
  let bankc = ""
  
  for(let i = 0; i < bank.length; i++) {
    let user = client.users.cache.get(bank[i].ID.split('_')[1]).username
    bankc += `${i+1}. ${user} - ${bank[i].data} \n`;
  }

    const embed = new discord.MessageEmbed()
      .setTitle(`${client.user.username}'s Leaderboard`)
      .setDescription(`**<:cash:751371033973489674> Cash Leaderboard:**\n${content}\n\n**<:bankbal:751374517632499772> Bank Leaderboard:**\n${bankc}`)
      .setColor(client.colors.theme)
      .setTimestamp()
    message.channel.send(embed)
  
}

exports.help = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "Economy"
}