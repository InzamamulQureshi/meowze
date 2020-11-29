const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const canvas = require("canvas")
client.config = require("./config.json")
client.colors = require ("./colors.json")
client.errors = require("./errors.json")
client.emotes = require("./emojis.json")
client.snipe = new Map()
client.editsnipe = new Map()
const express = require("express")
const { Database } = require("quickmongo");
client.db = new Database("Mongodb cluster address here");
const app = express();

app.get("/", (req, res) => {

res.sendStatus(200)

});

app.listen(3000)

let modules = ["utility", "action", "fun", "moderation", "owner", "giveaways", "economy"]; 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

modules.forEach(module => {
fs.readdir(`./commands/${module}/`, (err, files) => {
  if(err) console.log(err)
files.forEach(f => {
  if(!f.endsWith(".js")) return;
if(f.length <= 0) return console.log(" No commands")
console.log(f + " Loaded")
let command = require(`./commands/${module}/${f}`)
client.commands.set(command.help.name, command)
command.help.aliases.forEach(alias => {
client.aliases.set(alias, command.help.name)
})
})
})
})

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loaded Event: ${file}`);
        client.on(eventName, event.bind(null, client));
    });
});

client.login(client.config.token)
