const { Client, Integration, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

//-----------------------------------------------------------------------------------------------------


module.exports = {

    name        : "play",
    description : "Joins Luna then starts playing. Will be changed to a sep command for join and play",
    cooldown    : 1,
    aliases     : ["p"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES", "CONNECT", "SPEAK"],
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