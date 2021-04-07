module.exports = {
    name: 'howgay',
    description: 'howgay',
    execute(message, args){
        message.channel.send(`${message.member.user.tag} gayness : ${between(0, 100)}%`)
    }
}
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
