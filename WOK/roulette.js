const Discord = require("discord.js");
const Info = require("../Info.json");
const Weapons = require("../Weapons.json");
const fs = require("fs");

module.exports.run = async (Client, message, args) => {
   
























































    
    if(message.mentions.members.first() && message.mentions.members.first().id !== message.author.id)
    {
        var dmembedFG = new Discord.MessageEmbed()
        .setColor("#BA3435")
        .setTitle(`${message.author.username} has challenged you to Roulette`)
        .setDescription(`${message.author.username} has challenged you to Roulette Click ✅ if you Accept (Roulette bans the loser and sets money, level and xp back to 0) if you win you get all your opponents loot`)
        .setTimestamp()
        .setFooter(`Fight Bot By ${Info.Creator}`)
        var msg = await message.mentions.members.first().send(dmembedFG)

        msg.react('❎').then(() => msg.react('✅'));

        const filter = (reaction, user) => {
            console.log(user.id);
            console.log(message.mentions.members.first().id);
            return ['❎','✅'].includes(reaction.emoji.name) && user.id === message.mentions.members.first().id;
        };

        msg.awaitReactions(filter, { max: 1, time: 6000000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '❎') {
             
                message.mentions.members.first().send("you have declined this Roulette")
                message.author.send(`${message.mentions.members.first()} has declined your Roulette Game`)
                msg.delete();
                
            } else if(reaction.emoji.name === '✅')
            {
                var data1
                player1id = message.author;
                player2id = message.mentions.members.first();
                const jsonString1 = fs.readFileSync(`./User/${player2id.user.id}.json`, 'utf-8');
                data2 = JSON.parse(jsonString1);
                const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
                data = JSON.parse(jsonString);
                message.mentions.members.first().send("you have accepted this Game of Roulette")
                message.author.send(`${message.mentions.members.first()} has accepted your Game of Roulette`)
                msg.delete();
                
                
                
                
               
                

                










            }
        })
        .catch(collected => {
            message.mentions.members.first().send('You timed out');
            message.author.send("your partner timed out");
            msg.delete();
        });


    }
}






module.exports.help = {
    name: "fight"
}