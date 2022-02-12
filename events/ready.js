module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        const cron = require('cron');
        const wordleChannel = bot.channels.cache.get('936688898137010277');
        //Log Bot's username and the amount of servers its in to console
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

        let scheduledMessage = new cron.CronJob('51 16 * * *', () => {
            let scores = { '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], 'X': [] };
            let lowestScore = 6;
            const wordleChannel = bot.channels.cache.get('936688898137010277');
            wordleChannel.messages.fetch({ limit: 100 }).then(wordleMessages => {
                console.log(`Received ${wordleMessages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                wordleMessages.forEach(wordleMessage => {
                    if (isWordleMessage(wordleMessage)) {
                        const score = wordleMessage.content.split('\n')[0].split(' ')[2].split('/')[0];
                        const author = wordleMessage.author.username;
                        scores[score].push(author);
                        if (parseInt(score) < lowestScore) { 
                            lowestScore = score;
                        } 
                    }
                })
            })
            setTimeout( () => {
                console.log(scores);
                wordleChannel.send("Today's best Wordler('s):\n" + scores[lowestScore] + "\n" + "Best Score: " + lowestScore);
            }, 500);
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
