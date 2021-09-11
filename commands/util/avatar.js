// ██████ Integrations █████████████████████████████████████████████████████████

// A powerful library for interacting with the Discord API
const { Client, Interaction, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');
/*
module.exports = {
    const data = new SlashCommandBuilder()
            .setName("avatar")
            .setDescription("Returns the profile picture of a mentioned user.")
            
}*/




// –––––– Parameters –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

module.exports = {

    name        : "avatar",
    description : "Returns the profile picture of a mentioned user.",
    cooldown    : 3,
    aliases     : ["pp"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES"],
    usage       : "avatar",
    options     : [
            {
                "type": 6,
                "name": "user",
                "description": "Mention a user"
        }
    ],
    
    /**
     * @param {Client} cleint 
     * @param {Interaction} interaction 
     * @param {*} args 
     * @param {*} type 
     */
    async execute(client, interaction, args, type) {
        var IsPing;
        try {
            IsPing = (type ? interaction.options.getUser("user") : interaction.mentions.members.first().user);
        } catch (error) {
            IsPing = null;
        }

        const ReqUser = (IsPing ? IsPing : client.users.cache.find((x) => x.username === args[0]) || interaction.member.user),
        //const ReqUser = interaction.options.getUser("user"),

            embed = new MessageEmbed()
                        .setColor("#36393f")
                        .setAuthor(ReqUser.username)
                        .setImage(ReqUser.displayAvatarURL({
                            dynamic : "true",
                            size    : 1024
                        }));

        interaction.reply({ embeds: [ embed ] });

    }

// –––––– Execution ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    /*
    async execute(Glossary, client, message, args) {

        // Load Glossary
        Glossary = Glossary.get("commands");
        // Remove the 'Request' message
        await message.delete();
        // Shortens the link to the user if it is pinged
        const IsPing  = message.mentions.members.first(),
        // Retrieves the user's information if it is pinged, or search the username; otherwise use the applicant's information.
              ReqUser = (IsPing ? IsPing.user : client.users.cache.find((x) => x.username === args[0]) || message.member.user),
        // Generation of an embed to format and send the transmitted information
              embed   = new MessageEmbed()
                            .setColor("#36393f")
                            .setAuthor(ReqUser === message.author ? Glossary.avatar(ReqUser)[0] : Glossary.avatar(ReqUser)[1], message.member.user.displayAvatarURL())
                            .setImage(ReqUser.displayAvatarURL({
                                format  : "png",
                                dynamic : true,
                                size    : 1024
                            }));

        // Send the embed and add a reaction to be able to remove it.
        client.func.delAfterSend(client, message, embed, "🗑");
    }*/
};