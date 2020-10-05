module.exports = async(client, message) => {

if(!message.guild || message.author.bot) return;
  
  let prefix = await client.db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.d_prefix

if(!message.content.toLowerCase().startsWith(prefix)) return
 
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

if(command) command.run(client, message, args).catch(console.log);
  client.capitalize = string => {
return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
  if(!command) return;
  client.channels.cache.get("753209195947360326").send(`${client.capitalize(cmd)} command was ran by ${message.author.tag} in ${message.guild.name}`)
  
}