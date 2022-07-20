import Datastore from 'nedb';

function log(logMessage, guild) {

    const guildAdminDatabase = new Datastore({ filename: `./databases/${guild.id}/admin.db`, autoload: true });

    guildAdminDatabase.findOne({_id: 'logChannelId'}, function(err, doc) {
        if (doc == null) {
            console.log(`${guild.name} does not currently have a Command Log Channel`);
            console.log("Creating one now...");
            createLogChannel(guild, guildAdminDatabase);
        }

        // logging~~

    });
    

}



log(123, 123);