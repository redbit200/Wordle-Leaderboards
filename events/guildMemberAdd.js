module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
        //Log the newly joined member to console
        console.log('User ' + member.user.tag + ' has joined the server!');
    }
}