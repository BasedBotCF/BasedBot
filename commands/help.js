module.exports = {
    name: 'help',
    description: 'Get all info about commands with help',
    execute(message, args){
        message.channel.send(`commands:
        \`.ping\` - PONG
        \`.runcmd\` - ONLY FOR COOL KIDS!!!!
        \`.ban\` - bans people
        \`.kick\` - kicks people
        \`.balls\` - Balls
        \`.8ball\` - the fuck you think?
        \`.howgay\` - you are gay
        \`.meme\` - try to send a meme but will probs stroke out
        \`.LETSGO\` - You know its Baby, ____
        `)
    }
}
