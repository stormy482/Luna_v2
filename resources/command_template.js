const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {

    name        : "name",
    description : "description",
    cooldown    : 1,
    aliases     : ["alias"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES"],
    usage       : "cmd",
    options     : [],
    
    /**
     * @param {Client} cleint 
     * @param {Interaction} interaction 
     * @param {*} args 
     * @param {*} type 
     */
    async execute(cleint, interaction, args, type) {
        // runs on execution
    }
};