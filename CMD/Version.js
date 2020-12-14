const Discord = require("discord.js");
const Info = require("../Info.json");

module.exports.run = async (Client, message, args) => {
    if(message.channel.type === "dm") return;
    message.channel.send(`${Info.Name} by Obi-Wan Kenobi ver: ${Info.Version}`)



}



module.exports.help = {
    name: "version"
}