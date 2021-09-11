const { Client, Interaction, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

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
    options     : [
            {
                "type": 3,
                "name": "music",
                "description": "What musik does thee want to play?",
                "required": true,
            }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {*} args 
     * @param {*} type 
     */
    async execute(client, interaction, args, type) {
        // runs on execution
    }

};