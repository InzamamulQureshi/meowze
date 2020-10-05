const ms = require('ms');
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    // Giveaway channel
  

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = args[1];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(" ")
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
      
    }
   let giveawayChannel = message.channel
  
  message.channel.send(`Giveaway of ${giveawayPrize} has been created!`)
  
  message.delete()

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"<:meow_giveaway:705651472297361460> __**G I V E A W A Y**__ <:meow_giveaway:705651472297361460>", // <:giveaway_cat:703183401020031106> this pls
            giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"<:meow_giveaway:705651472297361460> **GIVEAWAY ENDED** <:meow_giveaway:705651472297361460>", // <:giveaway_cat:703183401020031106> this pls
            timeRemaining: "Ending in: **{duration}**!",
            inviteToParticipate: "React with 🎁 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}** 🥳!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled\nMinimum 5 Participants are required",
            hostedBy: "Hoster: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });
};

module.exports.help = {
  name: "gstart",
  aliases: ["start"],
  category: "Giveaways"
}