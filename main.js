import puppeteer from 'puppeteer';
import 'dotenv/config';
import { Client, Intents, Collection } from 'discord.js-selfbot-v13';
import { joinVoiceChannel } from '@discordjs/voice';
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const botToken = process.env.bot_token;

// import { start } from './screenshare.js';

// import pkg from 'selenium-webdriver/chrome.js';
// const { chrome } = pkg;
import * as webdriver from 'selenium-webdriver';
import 'chromedriver';
import pkg from 'selenium-webdriver/chrome.js';
const chrome = pkg;
const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).build();
try {
    await driver.get('https://google.com')
} catch (error) {
    
}

client.commands = new Collection();
const deployCommandsBody = [];

client.once("ready", () => {
    console.log("Logged in.");

    client.user.setPresence({ activities: [{ name: "over the human race...", type: "WATCHING"}], status: 'dnd' });

    setupCommands();

});



client.on("messageCreate", msg => {
    if (msg.content == "?test") {
        const guildAdminDatabase = new Datastore({ filename: `./databases/${msg.guild.id}/admin.db`, autoload: true });
        fetchCommandLogChannel(msg.guild, guildAdminDatabase);
        
    } else if (msg.content == "?test2") {
        msg.guild.channels.cache.filter(channel => channel.name === "Administrative Channels").forEach(channel => {
            channel.delete();
        })
    } else if (msg.content == "?test3") {
        console.log(msg.guild.channels.cache.get('890931815639056434'));
    }
    else { return }
});



client.on("interactionCreate", async(interaction) => {
    if (interaction.isCommand) {
        const command = client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: command.ephemeral });
             }
        }
    }
    return
});


/**
 * 
 * FUNCTIONS
 * 
 */

async function setupCommands() {
    await fetchCommands();
    // await deployCommandsGlobally();
    // await deleteGuildCommands();

    await deployCommandsToGuild();
    // await deleteGlobalCommands();
    
    console.log("Finished setting up commands")
}

import fs from 'fs';
async function fetchCommands() {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const { default: command } = await import(`./commands/${commandFile}`);

        client.commands.set(command.data.name, command);
        deployCommandsBody.push(command.data.toJSON());
    }
    console.log("Finished fetching commands");
}

import { REST } from "@discordjs/rest";
const rest = new REST({version: '9'}).setToken(process.env.user_login_token);
import { Routes } from "discord-api-types/v9";

async function deployCommandsToGuild() {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.user_client_id, '737170481219895420'),
            { body: deployCommandsBody }
        );
        console.log("Deployed commands to Guild")

    } catch (error) { console.log(error); }
}
async function deployCommandsGlobally() {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.user_client_id),
            { body: deployCommandsBody }
        );
        console.log("Deployed commands Globally")

    } catch (error) { console.log(error); }
}

async function deleteGuildCommands() {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.user_client_id, '737170481219895420'),
            { body: [] }
        );
        console.log("Deleted Guild commands");

    } catch (error) { console.log(error); }
}
async function deleteGlobalCommands() {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.user_client_id),
            { body: [] }
        );
        console.log("Deleted Global commands");

    } catch (error) { console.log(error); }
}

/**
 * LOGIN
 */

client.login(botToken);
