module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        const cron = require('cron');
        let wotdCommand = bot.commands.get('wotd');
        //Log Bot's username and the amount of servers its in to console
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

        let recap = new cron.CronJob('59 23 * * *', () => {
            if(wotdCommand) wotdCommand.run(bot);
        });

        //Set the Presence of the bot user
        bot.user.setPresence({ activities: [{ name: 'Wordle'}] });
        recap.start();

    }
}


