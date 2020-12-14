const Discord = require("discord.js");
const Weapons = require("../Weapons.json");
const Info = require("../Info.json");
const fs = require("fs");


module.exports.run = async (Client, message, args) => {
    if(message.channel.type === 'dm'){

     
      var filelocation = `./User/${message.author.id}.json`;
        if(args[1] === "primary")
        {
            var page = 1;
            var data;
            console.log(message.author.id);
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);
            console.log(data.money, "outside fs stament");
            
            var dmembedP = new Discord.MessageEmbed()
            .setColor("#BA3435")
            .setTitle("Fight bot Shop Primary")
            .setDescription(`${message.author.username}'s money ${data.money}DC`)
            .addField("name",  Weapons.weapons.primary[page].name, true)
            .addField("Damage",  Weapons.weapons.primary[page].damage, true)
            .addField("Price",  Weapons.weapons.primary[page].price, true)
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
                            .setTitle("Fight bot Shop Primary")
                            .setDescription(`${message.author.username}'s money ${data.money}DC`)
                            .addField("name",  Weapons.weapons.primary[page].name, true)
                            .addField("Damage",  Weapons.weapons.primary[page].damage, true)
                            .addField("Price",  Weapons.weapons.primary[page].price, true)
                            .setTimestamp()
                            .setFooter(`Fight Bot By ${Info.Creator}`)
                            Messagesend(ndmembedP, mess);
                            
                            
                            
                            
                        } else if(reaction.emoji.name === '➡') {
                            page += 1;
                            var ndmembedP = new Discord.MessageEmbed()
                            .setColor("#BA3435")
                            .setTitle("Fight bot Shop Primary")
                            .setDescription(`${message.author.username}'s money ${data.money}DC`)
                            .addField("name",  Weapons.weapons.primary[page].name, true)
                            .addField("Damage",  Weapons.weapons.primary[page].damage, true)
                            .addField("Price",  Weapons.weapons.primary[page].price, true)
                            .setTimestamp()
                            .setFooter(`Fight Bot By ${Info.Creator}`)
                            Messagesend(ndmembedP, mess)
                            
                            
                            
                        }else if(reaction.emoji.name === '✅')
                        {
                            console.log(data.money >= Weapons.weapons.primary[page].price)
                            if(data.money >= Weapons.weapons.primary[page].price)
                            {
                                message.channel.send("Purchasing...");
                                let owneditems = data.owneditem.split(" ");
                                console.log(owneditems.length)
                                var loopfound = true;
                                for(var i = 0; i<owneditems.length; i++)
                                {
                                    console.log(`run ${i}`)
                                    if(owneditems[i] === Weapons.weapons.primary[page].id)
                                    {
                                        console.log(`run ${i}`)
                                        message.channel.send('You Already Own this Item');
                                        loopfound = false
                                    }
                                }
                               
                               if(loopfound)
                               {
                                data.money -= Weapons.weapons.primary[page].price;
                                data.owneditem = data.owneditem + ' '+ Weapons.weapons.primary[page].id
                                message.channel.send("Purchase Aproved");
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                               }
                               
                                
                            }else{
                                message.channel.send("sorry you do not have enoght DC to buy this item");
                                
                            }
                        }
                    })
                    .catch(collected => {
                        message.reply('you have gone through the shops catalog');
                    });
             
                    async function Messagesend(ndmembedP, mess) {
                       
                        mess.delete()
                        msg = await message.channel.send(ndmembedP);
                        
                        shop(msg)
                        
                    }
                
               
            }
            shop(msg)

        }else if(args[1] === "secondary")
        {
            var page = 1;
            var data;
            console.log(message.author.id);
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);
            console.log(data.money, "outside fs stament");
            
            var dmembedP = new Discord.MessageEmbed()
            .setColor("#BA3435")
            .setTitle("Fight bot Shop Secondary")
            .setDescription(`${message.author.username}'s money ${data.money}DC`)
            .addField("name",  Weapons.weapons.secondary[page].name, true)
            .addField("Damage",  Weapons.weapons.secondary[page].damage, true)
            .addField("Price",  Weapons.weapons.secondary[page].price, true)
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
                            .setTitle("Fight bot Shop Primary")
                            .setDescription(`${message.author.username}'s money ${data.money}DC`)
                            .addField("name",  Weapons.weapons.secondary[page].name, true)
                            .addField("Damage",  Weapons.weapons.secondary[page].damage, true)
                            .addField("Price",  Weapons.weapons.secondary[page].price, true)
                            .setTimestamp()
                            .setFooter(`Fight Bot By ${Info.Creator}`)
                            Messagesend(ndmembedP, mess);
                            
                            
                            
                            
                        } else if(reaction.emoji.name === '➡') {
                            page += 1;
                            var ndmembedP = new Discord.MessageEmbed()
                            .setColor("#BA3435")
                            .setTitle("Fight bot Shop Primary")
                            .setDescription(`${message.author.username}'s money ${data.money}DC`)
                            .addField("name",  Weapons.weapons.secondary[page].name, true)
                            .addField("Damage",  Weapons.weapons.secondary[page].damage, true)
                            .addField("Price",  Weapons.weapons.secondary[page].price, true)
                            .setTimestamp()
                            .setFooter(`Fight Bot By ${Info.Creator}`)
                            Messagesend(ndmembedP, mess)
                            
                            
                            
                        }else if(reaction.emoji.name === '✅')
                        {
                            console.log(data.money >= Weapons.weapons.secondary[page].price)
                            if(data.money >= Weapons.weapons.secondary[page].price)
                            {
                                message.channel.send("Purchasing...");
                                let owneditems = data.owneditem.split(" ");
                                console.log(owneditems.length)
                                var loopfound = true;
                                for(var i = 0; i<owneditems.length; i++)
                                {
                                    console.log(`run ${i}`)
                                    if(owneditems[i] === Weapons.weapons.secondary[page].id)
                                    {
                                        console.log(`run ${i}`)
                                        message.channel.send('You Already Own this Item');
                                        loopfound = false
                                    }
                                }
                               
                               if(loopfound)
                               {
                                data.money -= Weapons.weapons.secondary[page].price;
                                data.owneditem = data.owneditem + ' '+ Weapons.weapons.secondary[page].id
                                message.channel.send("Purchase Aproved");
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                               }
                               
                                
                            }else{
                                message.channel.send("sorry you do not have enoght DC to buy this item");
                                
                            }
                        }
                    })
                    .catch(collected => {
                        message.reply('you have gone through the shops catalog');
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
            var page = 1;
            var data;
            console.log(message.author.id);
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);
            console.log(data.money, "outside fs stament");
            console.log(Weapons.weapons.specialmove[page].heal);
            if(Weapons.weapons.specialmove[page].ishealing === true)
            {
                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Shop Special")
                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                .addField("Healing",  Weapons.weapons.specialmove[page].heal, true)
                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                var msg = await message.channel.send(dmembedP)
            }else{
                var dmembedP = new Discord.MessageEmbed()
                .setColor("#BA3435")
                .setTitle("Fight bot Shop Special")
                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                .addField("Damage",  Weapons.weapons.specialmove[page].damage, true)
                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
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
                            
                            if(Weapons.weapons.specialmove[page].ishealing === true)
                            {
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Shop Primary")
                                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                                .addField("Healing",  Weapons.weapons.specialmove[page].heal, true)
                                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                            }else{
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Shop Primary")
                                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                                .addField("Damage",  Weapons.weapons.specialmove[page].damage, true)
                                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                            }
                            
                            
                            
                            
                        } else if(reaction.emoji.name === '➡') {
                            page += 1;
                            if(Weapons.weapons.specialmove[page].ishealing === true)
                            {
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Shop Primary")
                                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                                .addField("Healing",  Weapons.weapons.specialmove[page].heal, true)
                                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                            }else{
                                var ndmembedP = new Discord.MessageEmbed()
                                .setColor("#BA3435")
                                .setTitle("Fight bot Shop Primary")
                                .setDescription(`${message.author.username}'s money ${data.money}DC`)
                                .addField("name",  Weapons.weapons.specialmove[page].name, true)
                                .addField("Damage",  Weapons.weapons.specialmove[page].damage, true)
                                .addField("Price",  Weapons.weapons.specialmove[page].price, true)
                                .setTimestamp()
                                .setFooter(`Fight Bot By ${Info.Creator}`)
                                Messagesend(ndmembedP, mess);
                            }
                            
                            
                            
                            
                        }else if(reaction.emoji.name === '✅')
                        {
                            console.log(data.money >= Weapons.weapons.specialmove[page].price)
                            if(data.money >= Weapons.weapons.specialmove[page].price)
                            {
                                message.channel.send("Purchasing...");
                                let owneditems = data.owneditem.split(" ");
                                console.log(owneditems.length)
                                var loopfound = true;
                                for(var i = 0; i<owneditems.length; i++)
                                {
                                    console.log(`run ${i}`)
                                    if(owneditems[i] === Weapons.weapons.specialmove[page].id)
                                    {
                                        console.log(`run ${i}`)
                                        message.channel.send('You Already Own this Item');
                                        loopfound = false
                                    }
                                }
                               
                               if(loopfound)
                               {
                                data.money -= Weapons.weapons.specialmove[page].price;
                                data.owneditem = data.owneditem + ' '+ Weapons.weapons.specialmove[page].id
                                message.channel.send("Purchase Aproved");
                                fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                               }
                               
                                
                            }else{
                                message.channel.send("sorry you do not have enoght DC to buy this item");
                                
                            }
                        }
                    })
                    .catch(collected => {
                        message.reply('you have gone through the shops catalog');
                        
                    });
             
                    async function Messagesend(ndmembedP, mess) {
                       
                        mess.delete()
                        msg = await message.channel.send(ndmembedP);
                        
                        shop(msg)
                        
                    }
                
               
            }
            shop(msg)

        }else if(args[1] === "hp")
        {
            const jsonString = fs.readFileSync(`./User/${message.author.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);
            var ndmembedP = new Discord.MessageEmbed()
            .setColor("#BA3435")
            .setTitle("Fight bot Shop Primary")
            .setDescription(`${message.author.username}'s money ${data.money}DC`)
            .addField("Extra HP",  50 +" HP", true)
            .addField("Price",  420*data.level + 150 + " DC", true)
            .setTimestamp()
            .setFooter(`Fight Bot By ${Info.Creator}`)
            var msg = await message.channel.send(ndmembedP)

            
            msg.react('❎').then(() => msg.react('✅'));

                const filter = (reaction, user) => {
                    return ['❎','✅'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                    

                if(reaction.emoji.name === '❎')
                {
                    msg.delete()

                }else if(reaction.emoji.name === '✅'){
                    var moneyneeded= 420*data.level + 150;
                    if(data.money >= moneyneeded)
                    {
                        message.channel.send("Purchasing...");
                    
                        data.money = data.money - moneyneeded;
                        data.hp = data.hp +  50;
                        fs.writeFileSync(`./User/${message.author.id}.json`, JSON.stringify(data));
                        message.channel.send("Approved");
                    }else
                    {
                        message.channel.send("You Dont Have Enoth Funds");
                    }
                
                }
            });



        }else{
            message.channel.send("that is an unknown catagory did you spell it right")
        }
        

  

    




    }
   



}



module.exports.help = {
    name: "shop"
}