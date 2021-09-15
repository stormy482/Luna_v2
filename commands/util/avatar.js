// ██████ Integrations █████████████████████████████████████████████████████████

// A powerful library for interacting with the Discord API
const { Client, Interaction, MessageEmbed } = require("discord.js");

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
     * @param {Client} client 
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
};