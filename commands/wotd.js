exports.run = async (bot, message = false, args = []) => {

    let scores = { '1': [], '2': ['collin'], '3': [], '4': [], '5': [], '6': [], 'X': [] };
    let lowestScore = 6;
    const today = new Date();
    const wordleChannel = bot.channels.cache.get('936688898137010277');
    wordleChannel.messages.fetch({ limit: 100 }).then(wordleMessages => {
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
        let embed = {
            "title": "Wordle Recap",
            "description": "The results are in... :drum:",
            "url": "",
            "color": 7259656,
            "timestamp": String(today),
            "footer": {
              "icon_url": String(bot.user.avatarURL()),
              "text": "Daily Wordle Recap"
            },
            "thumbnail": {
              "url": String(bot.user.avatarURL())
            },
            "fields": [
              {
                "name": ":star2: Best Score",
                "value": String(lowestScore),
                "inline": true
              },
              {
                "name": ":crown: Winners",
                "value": (scores[lowestScore].length >= 1 ? String(scores[lowestScore].join('\n')) : 'No winners yet!'),
                "inline": true
              }
            ]
        };

        if (message == false) {
            embed.title = 'Daily Wordle Recap'
            wordleChannel.send({embeds: [embed]});
        } else {
            message.channel.send({embeds: [embed]});
        }
    }, 500);
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