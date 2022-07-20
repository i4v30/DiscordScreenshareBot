import SlashCommandBuilder from '@discordjs/builders';

const COMMAND = {
    data: new SlashCommandBuilder()
        .setName()
        .setDescription(),
    async execute(interaction) {
        console.log(interaction);
    }
}

export default COMMAND;