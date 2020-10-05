module.exports = async (client) => {
  
  await console.log(`____________________\n${client.user.tag} is ready!`)
  client.channels.cache.get("753209195947360326").send(`I am ready!!`)
  let activities = [`${client.users.cache.size} members`, `${client.guilds.cache.size} servers`], i = 0;
  setInterval(() => {
    client.user.setActivity(`${activities[i++ % activities.length]} | m!help`, { type: "WATCHING" })
}, 15000)
    client.user.setPresence({     
      status: "dnd"   
    }); 
  
};