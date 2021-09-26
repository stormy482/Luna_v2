// this will be the file that allows for "alexa like" voice commands
const { Client, Integration, MessageEmbed } = require("discord.js");


module.exports = {

    name        : "name",
    category    : "Sound",
    description : "description",
    cooldown    : 1,
    aliases     : ["alias"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES"],
    usage       : "cmd",
    options     : [],
    
    /**
     * @param {Client} cleint 
     * @param {Integration} interaction 
     * @param {*} args 
     * @param {*} type
     */
    async execute(cleint, interaction, args, type) {
        // runs on execution
    }
}

