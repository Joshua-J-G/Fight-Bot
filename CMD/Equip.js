const Discord = require("discord.js");
const Weapons = require("../Weapons.json");
const Info = require("../Info.json");
const fs = require("fs");


module.exports.run = async (Client, message, args) => {
    
    if(message.channel.type === 'dm'){

     
    
          if(args[1] === "primary")
          {
           
            var items = [];
            var itemid = [];
            var page = 0;
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let owneditems = data.owneditem.split(" ");

            for(var i = 0; i<owneditems.length; i++)
            {
                var num = owneditems[i].split("");
                var Prefix = num.splice(0,1);
                console.log(Prefix)
              
                
                
                if(Prefix[0] === "P")
                {
                    var strnum = "";
                    items.push(owneditems[i]);
                    console.log(items);
                   
                    for(var p=0; p<num.length; p++)
                    {
                        strnum += num[p];
                    
                    }
                    
                    var numint = parseInt(strnum);
                    itemid.push(numint);
                }
            }


                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Equip Primary")
                .setDescription(`Choose the item you want to equip for fighting`)
                .addField("name",  Weapons.weapons.primary[itemid[page]].name, true)
                .addField("Damage",  Weapons.weapons.primary[itemid[page]].damage, true)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                var msg = await message.channel.send(dmembedP)





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
                                
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Equip Primary")
                                .setDescription(`Choose the item you want to equip for fighting`)
                                .addField("name",  Weapons.weapons.primary[itemid[page]].name, true)
                                .addField("Damage",  Weapons.weapons.primary[itemid[page]].damage, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                                
                                
                                
                                
                            } else if(reaction.emoji.name === '➡') {
                                page += 1;
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Equip Primary")
                                .setDescription(`Choose the item you want to equip for fighting`)
                                .addField("name",  Weapons.weapons.primary[itemid[page]].name, true)
                                .addField("Damage",  Weapons.weapons.primary[itemid[page]].damage, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess)
                                
                                
                                
                            }else if(reaction.emoji.name === '✅')
                            {
                                data.primaryweapon = Weapons.weapons.primary[itemid[page]].id;
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                            }
                        })
                        .catch(collected => {
                            message.reply('Thats All You Own');
                        });
                 
                        async function Messagesend(ndmembedP, mess) {
                           
                            mess.delete()
                            msg = await message.channel.send(ndmembedP);
                            
                            shop(msg)
                            
                        }




            }






            
             
            
            shop(msg)
        }
        else if(args[1] === "secondary")
          {
            var items = [];
            var itemid = [];
            var page = 0;
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let owneditems = data.owneditem.split(" ");

            for(var i = 0; i<owneditems.length; i++)
            {
                var num = owneditems[i].split("");
                var Prefix = num.splice(0,1);
                console.log(Prefix)
              
                
                
                if(Prefix[0] === "S")
                {
                    var strnum = "";
                    items.push(owneditems[i]);
                    console.log(items);
                   
                    for(var p=0; p<num.length; p++)
                    {
                        strnum += num[p];
                    
                    }
                    
                    var numint = parseInt(strnum);
                    itemid.push(numint);
                }
            }


                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Equip Secondary")
                .setDescription(`Choose the item you want to equip for fighting`)
                .addField("name",  Weapons.weapons.secondary[itemid[page]].name, true)
                .addField("Damage",  Weapons.weapons.secondary[itemid[page]].damage, true)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                var msg = await message.channel.send(dmembedP)





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
                                
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Equip Secondary")
                                .setDescription(`Choose the item you want to equip for fighting`)
                                .addField("name",  Weapons.weapons.secondary[itemid[page]].name, true)
                                .addField("Damage",  Weapons.weapons.secondary[itemid[page]].damage, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                                
                                
                                
                                
                            } else if(reaction.emoji.name === '➡') {
                                page += 1;
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Equip Secondary")
                                .setDescription(`Choose the item you want to equip for fighting`)
                                .addField("name",  Weapons.weapons.secondary[itemid[page]].name, true)
                                .addField("Damage",  Weapons.weapons.secondary[itemid[page]].damage, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess)
                                
                                
                                
                            }else if(reaction.emoji.name === '✅')
                            {
                                data.secondaryweapon = Weapons.weapons.secondary[itemid[page]].id;
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                            }
                        })
                        .catch(collected => {
                            message.reply('Thats All You Own');
                        });
                 
                        async function Messagesend(ndmembedP, mess) {
                           
                            mess.delete()
                            msg = await message.channel.send(ndmembedP);
                            
                            shop(msg)
                            
                        }




            }






            
             
            
            shop(msg)
              
  
          }else if(args[1] === "special")
          {
            var items = [];
            var itemid = [];
            var page = 0;
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let owneditems = data.owneditem.split(" ");

            for(var i = 0; i<owneditems.length; i++)
            {
                var num = owneditems[i].split("");
                var Prefix = num.splice(0,1);
                console.log(Prefix)
              
                
                
                if(Prefix[0] === "J")
                {
                    var strnum = "";
                    items.push(owneditems[i]);
                    console.log(items);
                   
                    for(var p=0; p<num.length; p++)
                    {
                        strnum += num[p];
                    
                    }
                    
                    var numint = parseInt(strnum);
                    itemid.push(numint);
                }
            }



            if(Weapons.weapons.specialmove[itemid[page]].ishealing === true)
            {
                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Equip Primary")
                .setDescription(`Choose the item you want to equip for fighting`)
                .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                .addField("Healing",  Weapons.weapons.specialmove[itemid[page]].heal, true)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                var msg = await message.channel.send(dmembedP)

            }else{
                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Equip Primary")
                .setDescription(`Choose the item you want to equip for fighting`)
                .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                .addField("Damage",  Weapons.weapons.specialmove[itemid[page]].damage, true)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                var msg = await message.channel.send(dmembedP)

            }






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
                                
                                if(Weapons.weapons.specialmove[itemid[page]].ishealing === true)
                                {
                                    var ndmembedP = new Discord.MessageEmbed()
                                    .setColor("#BA3435")
                                    .setTitle("Fight bot Equip Primary")
                                    .setDescription(`Choose the item you want to equip for fighting`)
                                    .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                                    .addField("Healing",  Weapons.weapons.specialmove[itemid[page]].heal, true)
                                    .setTimestamp()
                                    .setFooter(`Fight Bot By ${Info.Creator}`)
                                    Messagesend(ndmembedP, mess)
                    
                                }else{
                                    var ndmembedP = new Discord.MessageEmbed()
                                    .setColor("#BA3435")
                                    .setTitle("Fight bot Equip Primary")
                                    .setDescription(`Choose the item you want to equip for fighting`)
                                    .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                                    .addField("Damage",  Weapons.weapons.specialmove[itemid[page]].damage, true)
                                    .setTimestamp()
                                    .setFooter(`Fight Bot By ${Info.Creator}`)
                                    Messagesend(ndmembedP, mess)
                    
                                }
                                
                                
                            } else if(reaction.emoji.name === '➡') {
                                page += 1;
                                if(Weapons.weapons.specialmove[itemid[page]].ishealing === true)
                                {
                                    var ndmembedP = new Discord.MessageEmbed()
                                    .setColor("#BA3435")
                                    .setTitle("Fight bot Equip Primary")
                                    .setDescription(`Choose the item you want to equip for fighting`)
                                    .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                                    .addField("Healing",  Weapons.weapons.specialmove[itemid[page]].heal, true)
                                    .setTimestamp()
                                    .setFooter(`Fight Bot By ${Info.Creator}`)
                                    Messagesend(ndmembedP, mess)
                    
                                }else{
                                    var ndmembedP = new Discord.MessageEmbed()
                                    .setColor("#BA3435")
                                    .setTitle("Fight bot Equip Primary")
                                    .setDescription(`Choose the item you want to equip for fighting`)
                                    .addField("name",  Weapons.weapons.specialmove[itemid[page]].name, true)
                                    .addField("Damage",  Weapons.weapons.specialmove[itemid[page]].damage, true)
                                    .setTimestamp()
                                    .setFooter(`Fight Bot By ${Info.Creator}`)
                                    Messagesend(ndmembedP, mess)
                    
                                }
                               
                                
                            }else if(reaction.emoji.name === '✅')
                            {
                                data.specialmove = Weapons.weapons.specialmove[itemid[page]].id;
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                            }
                        })
                        .catch(collected => {
                            message.reply('Thats All You Own');
                        });
                 
                        async function Messagesend(ndmembedP, mess) {
                           
                            mess.delete()
                            msg = await message.channel.send(ndmembedP);
                            
                            shop(msg)
                            
                        }




            }






            
             
            
            shop(msg)
  
          }else{
              message.channel.send("Your catagory is not reconised make sure everything is spelled corectly")
          }
          
  
    
  
      
  
  
  
  
      }
     



}



module.exports.help = {
    name: "equip"
}