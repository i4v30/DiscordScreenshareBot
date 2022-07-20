import SlashCommandBuilder from "@discordjs/builders";
import Datastore from 'nedb';

const COMMAND = {
	data: new SlashCommandBuilder()
		.setName('setcolor')
		.setDescription(`Sets the user's display color`)
        .addStringOption(option => 
            option.setName('hex-code')
                .setDescription(`The color's HEX code`)
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription("The user whose color to set")
                .setRequired(false)),
        ephemeral: true,
	async execute(interaction) {
        let hex_code = await interaction.options.getString("hex-code");
        if (hex_code.startsWith('#')) {
            hex_code = hex_code.slice(1);
        }
        const alphaNumbericRegEx = /^[a-z0-9]+$/i;
        if(!alphaNumbericRegEx.test(hex_code)) {
            await interaction.reply({content: `${hex_code} is an invalid HEX Code`, ephemeral: this.ephemeral});
            return;
        }

        let user;
        let content;
        if (interaction.options.getUser("user") == null) {
            user = interaction.user;
            content = `Set your color to`;
        } else {
            user = interaction.options.getUser("user");
            this.ephemeral = false;
            content = `Set ${user}'s color`;
        }

		await interaction.reply({content: content, ephemeral: this.ephemeral});
	},
};

export default COMMAND;