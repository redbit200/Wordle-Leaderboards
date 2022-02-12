exports.run = async (bot, message, args) => {
    let currentWinners = [];
    let lowestScore = 6;
    const wordleChannel = bot.channels.cache.get('936688898137010277');
    wordleChannel.messages.fetch({ limit: 50 }).then(wordleMessages => {
        console.log(`Received ${wordleMessages.size} messages`);
        //Iterate through the messages here with the variable "messages".
        wordleMessages.forEach(wordleMessage => {
            if (isWordleMessage(wordleMessage)) {
                const score = parseInt(wordleMessage.content.split('\n')[0].split(' ')[2].split('/')[0]);
                if (score <= lowestScore) {
                    lowestScore = score;
                    currentWinners.push(wordleMessage.author.username);
                }
            }
        })
    })
    console.log(currentWinners)
    setTimeout( () => { 
        message.channel.send("Today's best Wordler('s):\n" + currentWinners + "\n" + "Best Score: " + lowestScore);
    },500);
}

exports.help = {
    name:"wotd"
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