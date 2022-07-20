import Datastore from 'nedb-promises';


/**
 * COMMAND LOG CHANNEL
 */

async function createCommandLogChannel(guild, guildAdminDatabase) {
    const adminChannelCategory = await fetchAdminChannelCategory(guild, guildAdminDatabase);

    await guild.channels.create(
        '📝Command Log',
        {
            type: 'GUILD_TEXT',
            parent: adminChannelCategory.id
        }
    ).then(createdChannel => {
        console.log(`Created the Command Log Channel in ${guild.name}`);
        guildAdminDatabase.insert({ _id: 'commandLogChannelId', val: createdChannel.id });
    });
}

async function fetchCommandLogChannel(guild, guildAdminDatabase) {
    const entry = await guildAdminDatabase.findOne({ _id: 'commandLogChannelId' }).exec().then((response) => { return response });

    if (entry == null) {
        console.log(`${guild.name} does not have a Command Log Channel assigned`);
        console.log("Creating one now...");
        await createCommandLogChannel(guild, guildAdminDatabase);
        return fetchCommandLogChannel(guild, guildAdminDatabase);
    }

    if (!guild.channels.cache.has(entry.val)) {
        console.log(`The assigned Command Log Channel for ${guild.name} no longer exists`);
        console.log("Creating a new one now");
        await guildAdminDatabase.remove({ _id: 'commandLogChannelId' });
        await createCommandLogChannel(guild, guildAdminDatabase);
        return fetchCommandLogChannel(guild, guildAdminDatabase);
    }

    return await guild.channels.cache.get(entry.val);

}


async function createAdminChannelCategory(guild, guildAdminDatabase) {
    await guild.channels.create(
        'Administrative Channels',
        {
            type: 'GUILD_CATEGORY'
        }
    ).then(createdChannel => {
        console.log(`Created the Administrative Channel Category in ${guild.name}`);
        guildAdminDatabase.insert({ _id: 'adminChannelCategoryId', val: createdChannel.id });
    });
}

async function fetchAdminChannelCategory(guild, guildAdminDatabase) {
    const entry = await guildAdminDatabase.findOne({ _id: 'adminChannelCategoryId' }).exec().then((response) => { return response });

    if (entry == null) {
        console.log(`${guild.name} does not have an Admin Channel Category assigned`);
        console.log("Creating one now...");
        await createAdminChannelCategory(guild, guildAdminDatabase);
        return fetchAdminChannelCategory(guild, guildAdminDatabase);
    }

    if (!guild.channels.cache.has(entry.val)) {
        console.log(`The assigned Administrative Channel Category for ${guild.name} no longer exists`);
        console.log("Creating a new one now");
        await guildAdminDatabase.remove({ _id: 'adminChannelCategoryId' });
        await createAdminChannelCategory(guild, guildAdminDatabase);
        return fetchAdminChannelCategory(guild, guildAdminDatabase);
    }

    return await guild.channels.cache.get(entry.val);
}

export { fetchCommandLogChannel }
