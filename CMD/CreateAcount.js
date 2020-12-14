const Discord = require("discord.js");
const Info = require("../Info.json");
const fs = require('fs');
const { info } = require("console");
let hascard = false;
let stored;
module.exports.run = async (Client, message, args) => {
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;

    var filelocation = `./User/${message.member.user.id}.json`;

  
        if (fs.existsSync(filelocation)) {
          console.log("[Log] file exist")
          message.reply("You Already have an account")

          
        }else{
          console.log("[Log] file does not exist")
          message.reply("Creating acount")
          let data = JSON.stringify({
            'discord-id':`${message.member.user.id}`,
            'hp':100,
            'money': 0,
            'xp': 0,
            'level': 0,
            'primaryweapon': 'P0',
            'secondaryweapon': 'S0',
            'specialmove': 'J0',
            'wins': 0,
            'loses': 0,
            'owneditem':'P0 S0 J0',
            'cardlocation': "User1"
        });
          fs.writeFile(filelocation, data, err =>{
            if(err){
                console.log('[Log] '+ err);
            }
          });

          const embed = new Discord.MessageEmbed()
            .setColor("#BA3435")
            .setTitle(`${message.author.username}'s Account Info`)
            .setDescription('Fight Bot is a bot made for fighting other people on discord')
            .addFields(
                { name: "Account Name",value: message.author.username},
                { name: "Health" ,value: 100},
                { name: "Level",value: 0},
                { name: "xp",value: 0},
                { name: "wins",value:0},
                { name: "loses",value: 0}





            )
            .setTimestamp()
            .setFooter(`Fight Bot By ${Info.Creator}`)


          



          message.member.send(embed);
         


        }
      


}



module.exports.help = {
    name: "fcreate"
}