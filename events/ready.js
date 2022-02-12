module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        const cron = require('cron');
        const wordleChannel = bot.channels.cache.get('936688898137010277');
        //Log Bot's username and the amount of servers its in to console
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

        let scheduledMessage = new cron.CronJob('59 23 * * *', () => {
            let currentWinners = [];
            let lowestScore = 6;
            wordleChannel.messages.fetch({ limit: 50 }).then(messages => {
                console.log(`Received ${messages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                messages.forEach(message => { 
                    if (isWordleMessage(message)) {
                        const score = parseInt(message.content.split('\n')[0].split(' ')[2].split('/')[0]);
                        if (score <= lowestScore) {
                            lowestScore = score;
                            currentWinners.push(message.author.username);
                        }
                    }
                })
              })
                wordleChannel.send("Today's best Wordler('s):\n" + currentWinners.join(', ') + "\n" + "Best Score: " + lowestScore);
              });


        //Set the Presence of the bot user
        bot.user.setPresence({ activities: [{ name: 'Wordle'}] });
        scheduledMessage.start();

    }
}

const isWordleMessage = (message) => {
    const today = new Date();
    if (message.content.includes('Wordle') && (message.content.includes('⬜') || message.content.includes('🟨') || message.content.includes('🟩') || message.content.includes('⬛'))) {
        if (message.createdAt.getDate() == today.getDate()) {
            return true;
        }
    }
    return false;
}
