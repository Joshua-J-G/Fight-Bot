const Discord = require("discord.js");
const { createCanvas, loadImage} = require('canvas');
const Info = require("../Info.json");
const fs = require("fs");
const {join} = require("path")
const Weapons = require("../Weapons.json");


module.exports.run = async (Client, message, args) => {
    var filelocation = `./User/${message.author.id}.json`;
    function abbrNum(number, decPlaces) {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);
    
        // Enumerate number abbreviations
        var abbrev = [ "K", "M", "B", "T" ];
    
        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {
    
            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);
    
            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                 // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                 // This gives us nice rounding to a particular decimal place.
                 number = Math.round(number*decPlaces/size)/decPlaces;
    
                 // Handle special case where we round up to the next abbreviation
                 if((number == 1000) && (i < abbrev.length - 1)) {
                     number = 1;
                     i++;
                 }
    
                 // Add the letter for the abbreviation
                 number += abbrev[i];
    
                 // We are done... stop
                 break;
            }
        }
    
        return number;
    }




    function item(equipeditem)
    {
        var num = equipeditem.split("");
        var Prefix = num.splice(0,1);
        console.log(Prefix)
  
    
    
        if(Prefix[0] === "P")
        {
          var strnum = "";
        
        
       
            for(var p=0; p<num.length; p++)
            {
                strnum += num[p];
        
            }
        
        
             
            
            return Weapons.weapons.primary[num].name
        }else if(Prefix[0] === "S")
        {
            var strnum = "";
            
        
            for(var p=0; p<num.length; p++)
            {
                strnum += num[p];
        
            }
        
        
             
            
            return Weapons.weapons.secondary[num].name



        }else if(Prefix[0] === "J")
        {
            var strnum = "";
            
        
       
            for(var p=0; p<num.length; p++)
            {
                strnum += num[p];
        
            }
        
        
             
            
            return Weapons.weapons.specialmove[num].name
        
        }
    }



    if (fs.existsSync(filelocation)) {

        
    

        if(message.channel.type === 'dm'){
            var page = 1;
            var data;
            var msg
            var num = 0;
            console.log(message.author.id);
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            num = fs.readdirSync('./StockIMG/').length
            num = num - 1;
            var msg = await message.channel.send("", {files: [`./StockIMG/User${page}.png`]});
            
            function shop(mess){
                
                mess.react('⬅').then(() => mess.react('➡')).then(() => mess.react('✅'));

                const filter = (reaction, user) => {
                    return ['⬅', '➡','✅'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                mess.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
    
                        if (reaction.emoji.name === '⬅') {
                            page -= 1;
                            console.log(num)
                            if(page < 1)
                            {
                                page = num;
                            }
                            Messagesend(page, mess)
                           
                            
                            
                            
                        } else if(reaction.emoji.name === '➡') {
                            page += 1;
                            if(page > num)
                            {
                                page = 1;
                            }
                            Messagesend(page, mess)
                            
                            
                        }else if(reaction.emoji.name === '✅')
                        {
                            msg.delete();
                            data.cardlocation = `User${page}`;
                            fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));



                        }
                            
                    })
                    .catch(collected => {
                        message.reply('you have gone through the shops catalog');
                        
                    });
             
                    async function Messagesend(page, mess) {
                        mess.delete()
                        
                        msg = await message.channel.send("", {files: [`./StockIMG/User${page}.png`]});
                        shop(msg)
                    }
                
               
            }
          
            shop(msg)












        }else{
    
            const member = message.mentions.members.first() ||  message.member;
            


            const jsonString = fs.readFileSync(`./User/${member.user.id}.json`, 'utf-8');
            const data = JSON.parse(jsonString);
        
    
         
            const canvas = createCanvas(400, 120);
            const ctx = canvas.getContext('2d');
            const background = await loadImage(join(__dirname, "..","StockIMG", data.cardlocation+".png"));
            ctx.drawImage(background, 0,0,canvas.width, canvas.height);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#FFFFFF";
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(70,85, 250,28);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(70,85, 250,28);
            ctx.stroke();

            ctx.fillStyle = "#27e359"
            ctx.globalAlpha = 0.6;
            ctx.fillRect(70,85, (100/((data.level+2)*1921)*data.xp)*2.5,28)
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${data.xp}/${(data.level+2)*1921} XP`,195,105 )

            ctx.textAlign = "left";
            ctx.fillText(member.user.tag, 80, 30)


            ctx.font = "16px Arial";
            ctx.fillText(`level: ${data.level}      Money: ${abbrNum(data.money, 2)} DC`, 80, 50)
            
            ctx.fillText(`Wins: ${data.wins}    Loses:${data.loses} `, 80 , 70)


            ctx.arc(40,40,30,0,Math.PI*2, true);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(member.user.displayAvatarURL({ format: "jpg"}));
            ctx.drawImage(avatar,10,10,60,60);






            
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `Rank FigthBot.png`);
            message.channel.send(attachment);
        
        }
    }












   



}



module.exports.help = {
    name: "rank"
}