const Discord = require("discord.js");
const Info = require("../Info.json");
const Weapons = require("../Weapons.json");
const fs = require("fs");

module.exports.run = async (Client, message, args) => {
    var player1id;
    var player2id;
    var player1health = 100;
    var turncounter1 = 0;
    var turncounter2 = 0;
    var player2health = 100;
    var turnsystem = false;
    var player2special = false;
    var player1special = false;
    var gameover = false;
    var xpearned;
    var moneyearned;
    if(message.channel.type === "dm") return;

    function turn(msg)
    {
        if(player2special)
        {
            turncounter2 -= 1;
            if(turncounter2 <= 0)
            {
                player2special = false;
            }
        }
        if(player1special)
        {
            turncounter1 -= 1;
            if(turncounter1 <= 0)
            {
                player1special = false;
            }
        }


        if(!gameover)
        {
            if(!turnsystem)
            {
            turnsystem = true
            Player1turn(msg)
            }else{
            turnsystem = false
            Player2turn(msg)
            }
        }else{

            if(player2health === 0)
            {
                const jsonString1 = fs.readFileSync(`./User/${player2id.id}.json`, 'utf-8');
                data2 = JSON.parse(jsonString1);
                const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
                data = JSON.parse(jsonString);
                xpearned = 100* Math.floor(Math.random() * 10)+Math.floor(Math.random()*99);
                moneyearned = 25 * data.level + 20;
                data.money = moneyearned + data.money;
                data.wins = data.wins + 1;
                data2.loses = data2.loses+1;
                var overallxp = data.xp+xpearned
                if( overallxp >= (data.level+2)*1921)
                {
                    
                    data.xp = overallxp - ((data.level+2)*1921)
                    data.level = data.level+1


                }else{
                    data.xp = overallxp;
                }
                fs.writeFileSync(`./User/${player1id.id}.json`, JSON.stringify(data));
                fs.writeFileSync(`./User/${player2id.id}.json`, JSON.stringify(data2));


                
                var PlayerEMB = new Discord.MessageEmbed()
                .setColor("#26bd56")
                .setTitle(`The Winner is ${player1id.username}`)
                .setDescription(`${player1id.username} has won against ${player2id.user.username}`)
                .addField("XP", xpearned)
                .addField("Money", moneyearned)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                message.channel.send(PlayerEMB)
                
            }else if(player1health === 0)
            {
                const jsonString1 = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
                data2 = JSON.parse(jsonString1);

                const jsonString = fs.readFileSync(`./User/${player2id.id}.json`, 'utf-8');
                data = JSON.parse(jsonString);
                xpearned = 100* Math.floor(Math.random() * 10)+Math.floor(Math.random()*99);
                moneyearned = 25 * data.level + 20;
                data.money = moneyearned + data.money;
                data.wins = data.wins + 1;
                data2.loses = data2.loses+1;
                var overallxp = data.xp+xpearned
                if( overallxp >= (data.level+2)*1921)
                {
                    
                    data.xp = overallxp - ((data.level+2)*1921)
                    data.level = data.level+1


                }else{
                    data.xp = overallxp;
                }
                
                fs.writeFileSync(`./User/${player2id.id}.json`, JSON.stringify(data));
                fs.writeFileSync(`./User/${player1id.id}.json`, JSON.stringify(data2));
                var PlayerEMB = new Discord.MessageEmbed()
                .setColor("#26bd56")
                .setTitle(`The Winner is ${player2id.user.username}`)
                .setDescription(`${player2id.user.username} has won against ${player1id.username}`)
                .addField("XP", xpearned)
                .addField("Money", moneyearned)
                .setTimestamp()
                .setFooter(`Fight Bot By ${Info.Creator}`)
                message.channel.send(PlayerEMB)

            }






        }
        
        

       
    }



    async function Player1turn(msg)
    {
        msg.react('🔪').then(() => msg.react('🗡')).then(() => msg.react('🛡'));
        const filter = (reaction, user) => {
            console.log(user.id);
            
            return ['🔪','🗡','🛡'].includes(reaction.emoji.name) && user.id === player2id.id;
        };
        msg.awaitReactions(filter, { max: 1, time: 6000000, errors: ['time'] })
        .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '🔪'){
            console.log("primary atack used")
           
            const jsonString = fs.readFileSync(`./User/${player2id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.primaryweapon.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(player1health > Weapons.weapons.primary[numint2].damage)
            {
                player1health = player1health - Weapons.weapons.primary[numint2].damage;

            }else
            {
                

                console.log("dead")
                player1health = 0;
                gameover = true;





            }




            EmbedCreator(player1id.username,player1health)

        }else  if (reaction.emoji.name === '🗡'){
            console.log("secondary atack used")
           
            const jsonString = fs.readFileSync(`./User/${player2id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.secondaryweapon.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(player1health > Weapons.weapons.secondary[numint2].damage)
            {
                player1health = player1health - Weapons.weapons.secondary[numint2].damage;

            }else
            {
                

                console.log("dead")
                player1health = 0;
                gameover = true;





            }




            EmbedCreator(player1id.username,player1health)

        }else  if (reaction.emoji.name === '🛡')
        {
            if(!player2special)
            {
                console.log("Special atack used")
           
            const jsonString = fs.readFileSync(`./User/${player2id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.specialmove.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(Weapons.weapons.specialmove[numint2].ishealing){
                player2health = player2health + Weapons.weapons.specialmove[numint2].heal;
                turncounter2 = Weapons.weapons.specialmove[numint2].turns;
                player2special = true;
            }else{
                if(player1health > Weapons.weapons.specialmove[numint2].damage)
                {
                    player1health = player1health - Weapons.weapons.specialmove[numint2].damage;
                    turncounter2 = Weapons.weapons.specialmove[numint2].turns;
                    player2special = true;
    
                }else
                {
                    
    
                    console.log("dead")
                    player1health = 0;
                    gameover = true;
    
    
    
    
    
                }
            }
            




            EmbedCreator(player1id.username,player1health)


            


            }else{

                if(player1health > 2)
                {
                    player1health = player1health - 2;
    
                }else
                {
                    
    
                    console.log("dead")
                    player1health = 0;
                    gameover = true;
    
    
    
    
    
                }


                EmbedCreator(player1id.username,player1health)
            }
        }





        }).catch(collected => {
            message.mentions.members.first().send('You timed out');
            message.author.send("your partner timed out");
            msg.delete();
        });







        
    }






    async function Player2turn(msg)
    {
        msg.react('🔪').then(() => msg.react('🗡')).then(() => msg.react('🛡'));
        const filter = (reaction, user) => {
            console.log(user.id);
            
            return ['🔪','🗡','🛡'].includes(reaction.emoji.name) && user.id === player1id.id;
        };
        msg.awaitReactions(filter, { max: 1, time: 6000000, errors: ['time'] })
        .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '🔪'){
            console.log("primary atack used")
           
            const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.primaryweapon.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(player2health > Weapons.weapons.primary[numint2].damage)
            {
                player2health = player2health - Weapons.weapons.primary[numint2].damage;

            }else
            {
                

                console.log("dead")
                player2health = 0;
                gameover = true;





            }




            EmbedCreator(player2id.user.username,player2health)

        }else  if (reaction.emoji.name === '🗡'){
            console.log("secondary atack used")
           
            const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.secondaryweapon.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(player2health > Weapons.weapons.secondary[numint2].damage)
            {
                player2health = player2health - Weapons.weapons.secondary[numint2].damage;

            }else
            {
                

                console.log("dead")
                player2health = 0;
                gameover = true;





            }




            EmbedCreator(player2id.user.username,player2health)

        }else  if (reaction.emoji.name === '🛡')
        {
            if(!player1special)
            {

            console.log("Special atack used")
           
            const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
            data = JSON.parse(jsonString);

            let equip = data.specialmove.split("");
            let prefix = equip.splice(0,1);
            var strnum ="";
            var numint2;
           
            for(var p=0; p<equip.length; p++)
            {
                strnum += equip[p];
            
            }
            numint2 = parseInt(strnum);
           
            if(Weapons.weapons.specialmove[numint2].ishealing){
                player1health = player1health + Weapons.weapons.specialmove[numint2].heal;
                turncounter1 = Weapons.weapons.specialmove[numint2].turns;
                player1special = true;
            }else{
                if(player2health > Weapons.weapons.specialmove[numint2].damage)
                {
                    player2health = player2health - Weapons.weapons.specialmove[numint2].damage;
                    turncounter1 = Weapons.weapons.specialmove[numint2].turns;
                    player1special = true;
                }else
                {
                    
    
                    console.log("dead")
                    player2health = 0;
                    gameover = true;
    
    
    
    
    
                }
            }
            




            EmbedCreator(player2id.user.username,player2health)



            }else{

                if(player2health > 2)
                {
                    player2health = player2health - 2;
    
                }else
                {
                    
    
                    console.log("dead")
                    player2health = 0;
                    gameover = true;
    
    
    
    
    
                }


                EmbedCreator(player2id.user.username,player2health)
            }
        }





        }).catch(collected => {
            message.mentions.members.first().send('You timed out');
            message.author.send("your partner timed out");
            msg.delete();
        });


    }




    async function EmbedCreator(name, health)
    {
        var PlayerEMB = new Discord.MessageEmbed()
        .setColor("#BA3435")
        .setTitle(`${name} Turn`)
        .setDescription(`${name}'s Turn to attack`)
        .addField("health", health, true)
        .setTimestamp()
        .setFooter(`Fight Bot By ${Info.Creator}`)
        var msg = await message.channel.send(PlayerEMB)
        turn(msg)
    }

    if(message.mentions.members.first() && message.mentions.members.first().id !== message.author.id)
    {
        var dmembedFG = new Discord.MessageEmbed()
        .setColor("#BA3435")
        .setTitle(`${message.author.username} has challenged you to a fight`)
        .setDescription(`${message.author.username} has challenged you to a fight click the check if you accept or cross if you decline`)
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
             
                message.mentions.members.first().send("you have declined this fight")
                message.author.send(`${message.mentions.members.first()} has declined your fight`)
                msg.delete();
                
            } else if(reaction.emoji.name === '✅')
            {
                player1id = message.author;
                player2id = message.mentions.members.first();
                const jsonString1 = fs.readFileSync(`./User/${player2id.user.id}.json`, 'utf-8');
                data2 = JSON.parse(jsonString1);
                const jsonString = fs.readFileSync(`./User/${player1id.id}.json`, 'utf-8');
                data = JSON.parse(jsonString);
                message.mentions.members.first().send("you have accepted this fight")
                message.author.send(`${message.mentions.members.first()} has accepted your fight`)
                msg.delete();
                
                player1health = data.hp;
                player2health = data2.hp;
                EmbedCreator(player2id.user.username,player2health)
                
                
               
                

                










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