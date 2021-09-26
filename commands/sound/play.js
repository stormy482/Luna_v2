const { Client, Interaction, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
const ytsr = require("ytsr");
const spdl = require("spdl-core");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Prefix } = require("../../settings.json");

//-----------------------------------------------------------------------------------------------------

// NOTE: SOUNDCLOUD IS NO LONGER SUPPORTED AS I CAN'T GET A DEV KEY

module.exports = {

    name        : "play",
    category    : "Sound",
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

        // Getting channel that user is in
        const guild  = client.guilds.cache.get(interaction.guildId);
        const member  = guild.members.cache.get(interaction.member.user.id);
        const channel = member.voice.channel;
        if (!channel) return interaction.reply("Error: You need to join a voice channel first!").catch(console.error);

        // Getting queue from server and checking usage
        let serverQueue = interaction.client.queue.get(interaction.guild.id);
        if (serverQueue && channel !== interaction.guild.me.voice.channel)
            return interaction.reply(`Usage: ${Prefix}play <YouTube URL | Video Name | Spotify URL | Attach a file>`).catch(console.error);

        // Checking Perms
        const permissions = channel.permissionsFor(interaction.client.user);
        if (!permissions.has("CONNECT")) return interaction.reply("Cannot connect to voice channel, missing permissions");
        if (!permissions.has("SPEAK")) return interaction.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

        // Getting search or url
        const search = args.join(" ");
        const url = args[0];

        let fileClip;
        // Checking if user attached a file
        if (interaction.attachments.first()) {
            fileClip = interaction.attachments.first();
        }

        // Our regex patterns
        const youtubePattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const youtubePlaylistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const soundcloudPattern = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
        // Unused regex. I leave them here in case we manage to get a soundcloud dev key
        const mobileSoundcloud = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
        const spotifyPattern = /^(https:\/\/open.spotify.com\/.*playlist\/|spotify:.*:playlist:)([a-zA-Z0-9]+)(.*)$/gm;

        // Checking if given url is a playlist
        if (!youtubePattern.test(url) && youtubePlaylistPattern.test(url)) {
            // EXECUTE playlist command
        } else if (spotifyPattern.test(url)) {
            // EXECUTE playlist command
        }

        // Constructing our queue
        const queueConstruct = {
            textChannel: interaction.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: DEFAULT_VOLUME || 100,
            playing: true
        };

        let songInfo = null;
        let song = null;

        if (youtubePattern.test(url)) {
            try {
                songInfo = await ytdl.getInfo(url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds
                };
            } catch (error) {
                console.error(error);
                return interaction.reply(error.message).catch(console.error);
            }
        } else if (spdl.validateURL(url)) {
            try {
                songInfo = await spdl.getInfo(url, SPOTIFY_API_ID);
                song = {
                    title: songInfo.title,
                    url: songInfo.url,
                    duration: songInfo.duration
                };
            } catch (error) {
                console.error(error);
                return interaction.reply(error.message).catch(console.error);
            }
        } else if (fileClip) {
            song = {
                title: fileClip.name,
                url: fileClip.url,
                duration: null // TODO (for otey): https://stackoverflow.com/questions/50503460/get-duration-of-remote-mp3-file-without-full-download
            };
        } else {
            try {
                const results = await ytsr(search);

                
            } catch (error) {
                console.error(error);
                return interaction.reply(error.message).catch(console.error);
            }
        }


        

        


    }

};