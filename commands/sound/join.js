const { Client, Interaction, MessageEmbed, GuildMember, VoiceChannel } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {

    name        : "join",
    description : "make the bot join the god damn voice channel",
    cooldown    : 1,
    aliases     : ["j"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES", "CONNECT", "SPEAK"],
    usage       : "join",
    options     : [],
    
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {*} args 
     * @param {*} type 
     */
    async execute(client, interaction, args, type) {
        // runs on execution

        console.log(typeof(interaction.member));
        //public join(): Promise<VoiceConnection>;

        //const { channel } = interaction.member.voice;
        let guild  = client.guilds.cache.get(interaction.guildId);
        let member  = guild.members.cache.get(interaction.member.user.id);
        let channel = member.voice.channel;
        
        
        console.log(channel.id);
        console.dir(channel);
        console.log(channel.type);

        
        try {
            const connection = joinVoiceChannel({
                channelId      : channel.id,
                guildId        : interaction.guildId,
                adapterCreator : interaction.guild.voiceAdapterCreator
            })
        } catch (err) {
            console.log(err);
            interaction.reply("I'm sorry, can't join the voice channel.")
        }
    }
};