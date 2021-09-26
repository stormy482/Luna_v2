// ██████ Integrations █████████████████████████████████████████████████████████

// Grabbing the Settings library for prefix...
const { Prefix } = require("../../settings.json");
const { Menu } = require("discord.js-menu");

// A powerful library for interacting with the Discord API
const { Client, Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

// –––––– Parameters –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

module.exports = {

    name        : "help",
    category    : "Utility",
    description : "Lists the main commands.",
    cooldown    : 5,
    aliases     : ["hhh"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES"],

// –––––– Execution ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    /**
         * 
         * @param {Client} client 
         * @param {Interaction} interaction 
         * @param {*} args 
         * @param {*} type 
         */
    async execute(client, interaction, args, type) {

        const commands = client.commands;

        let catgories = new Set;
        commands.forEach(cmd => {
            catgories.add(cmd.category);
        });


        let cmds = new Map;
        catgories.forEach(category => {
            commands.forEach(cmd => {
                if (cmd.category == category) {
                    if (!cmds.has(category)) {
                        cmds.set(category, [{
                            name: cmd.name,
                            value: cmd.description,
                            inline: true
                        }]);
                    } else {
                        cmds.get(category).push({
                            name: cmd.name,
                            value: cmd.description,
                            inline: true
                        });
                    }
                }
            });
        });


        let options = [];
        catgories.forEach(category => {
            options.push({
                label: category,
                description: "TODO",
                value: category
            })
        });

        const menu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('helpMenuDir')
                    .setPlaceholder('Which subset would you like help with?')
                    .addOptions( options ),

            );

            await interaction.reply({ content: 'Help Menu Directory', components: [menu] });
        
        // Dont ask me why or how the fuck this works, because i dont know either
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) return;
        
            if (interaction.customId === 'helpMenuDir') {

                const embed = new MessageEmbed()
                    .setTitle(`Man ${interaction.values[0]}`)
                    .addFields(cmds.get(interaction.values[0]));

                await interaction.update({ content: `Chosen Menu: ${interaction.values[0]}`, embeds: [embed], components: [] });
            }
        });


/*
        let helpMenu = new Menu(interaction.channel, interaction.member.id, [ {
            name: 'Help Main Menu',
            content: new MessageEmbed({
                title: 'Help Main Menu',
                description: 'Main Menu',
                fields: cmds
            })
        }])

        helpMenu.start(); // NOTE: Had to modify start() in discord.js-menu for new interaction.reply. -Vio, 9/22/21
*/
    }
};


//        const commands = client.commands;
//        
//        // Embed help list
//        embed   = new MessageEmbed()
//            .setTitle("Help Menu!")
//            .setColor("#36393f")
//            .setDescription("Display all commands and descriptions")
//
//            commands.forEach((cmd) => {
//                embed.addField(
//                    `**${Prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : " "}**`,
//                    `${cmd.description}`,
//                    `${cmd.usage}`,
//                    true
//                )
//            });
// // Send the embed and add a reaction to be able to remove it.
// interaction.reply({ embeds: [ embed ] });