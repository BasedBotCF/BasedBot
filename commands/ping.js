module.exports = {
    name: 'ping',
    description: 'Ping test',
    execute(message, args){
        message.channel.send('Pong')
    }
}
