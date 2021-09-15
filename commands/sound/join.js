const { Client, Interaction, MessageEmbed, GuildMember, VoiceChannel } = require("discord.js");
const { EndBehaviorType, entersState, joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection, VoiceConnection } = require("@discordjs/voice");
const { Transform, Readable } = require("stream");
const { get } = require("http");
const { opus } = require("prism-media");
const { time } = require("console");
const { checkPrimeSync } = require("crypto");
const settings = require("../../settings.json");
var stt;

const exec = require("child_process");


const googleSpeech = require('@google-cloud/speech');
const { setMaxListeners } = require("process");
const googleSpeechClient = new googleSpeech.SpeechClient()

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

        const guild  = client.guilds.cache.get(interaction.guildId);
        const member  = guild.members.cache.get(interaction.member.user.id);
        const channel = member.voice.channel;

        // const member  = interaction.member;
        // const channel = member.voice.channel;
        
        
        const connection = joinVoiceChannel({
            channelId       : channel.id,
            guildId         : interaction.guildId,
            selfDeaf        : false,
            debug           : true,
            adapterCreator  : interaction.guild.voiceAdapterCreator
        });

        connection.receiver.speaking.on('start', userId => {
            const listen = connection.receiver.subscribe(userId, {
                end: {
                    behavior: EndBehaviorType.AfterSilence,
                    duration: 100,
                },
            })
            const stream = listen.pipe(new opus.Decoder({ frameSize: 960, channels: 1, rate: 48000}))

            // Google STT
            /*
            const requestConfig = {
                encoding: 'LINEAR16',
                sampleRateHertz: 48000,
                languageCode: 'en-US'
            }
            const request = {
                config: requestConfig
            }
            const recognizeStream = googleSpeechClient
                .streamingRecognize(request)
                .on('error', console.error)
                .on('data', response => {
                    const transcription = response.results
                        .map(result => result.alternatives[0].transcript)
                        .join('\n')
                        .toLowerCase()
                    interaction.channel.send(`Transcription: ${transcription}`);
                })
            stream.pipe(recognizeStream)*/
        });
        //connection.receiver.speaking.on('end', userId => interaction.channel.send(`User ${userId} stopped speaking`));

        interaction.reply('Succesfuly joined vc!');
    }
};
