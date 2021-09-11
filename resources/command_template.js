module.exports = {

    name        : "name",
    description : "description",
    cooldown    : 1,
    aliases     : ["alias"],
    guildOnly   : true,
    privileges  : ["SEND_MESSAGES"],
    usage       : "cmd",
    options     : [],
    
    async execute(cleint, interaction, args, type) {
        // runs on execution
    }
};