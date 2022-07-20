import SlashCommandBuilder from "@discordjs/builders";

const COMMAND = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({content: "Pong!", ephemeral: this.ephemeral});
	},
};

export default COMMAND;