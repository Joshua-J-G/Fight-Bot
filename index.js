const Discord = require("discord.js");
const Client = new Discord.Client();
const Info = require("./Info.json");
const fs = require("fs");
Client.commands = new Discord.Collection();

fs.readdir("./CMD", (err, files) => {


    if(err) console.log(`Error in CMD ${err}`);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find CMD add something to the CMD");
        return
    }


  jsfile.forEach((f, i) => {
    let props = require(`./CMD/${f}`);
    console.log(`${f} || Command Ready!`);
    Client.commands.set(props.help.name, props);
  });
});

Client.on("ready", () => {
    let today = new Date();
    console.log("[Log] "+Info.Name+" by "+Info.Creator);
    console.log("[Log] Launched " + today) 
});







Client.on("message", async message => {
    if (message.content.indexOf(Info.Prefix) !== 0) return;
    
    
    

    
   
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = message.content.substring(Info.Prefix.length).split(" ");

    
    let commandfile = Client.commands.get(cmd.slice(Info.Prefix.length));
    if(commandfile) commandfile.run(Client,message,args);

    
    
       
   
  

})







Client.login(Info.Token);