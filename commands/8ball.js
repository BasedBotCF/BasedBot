const Discord = require('discord.js')

module.exports = {
    name: '8ball',
    description: '8balls',
    execute(message, args){
        if(!args[0]) return message.reply('Please ask a question retard!')
        let replies = ["yes", "no", "fuck you", "____", "idk", "____"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
            .setAuthor(`🎱 ${message.author.username}`)
            .setColor("RED")
            .addField("Question", question)
            .addField("Answer", replies[result])

            message.channel.send(ballembed)
    }
}
