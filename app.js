const mineflayer = require('mineflayer');
const cmd = require('mineflayer-cmd').plugin;
const Discord = require("discord.js");
require('dotenv').config();
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const client = new Discord.Client();
const fs = require('fs');
const nmp = require('minecraft-protocol')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const prettyMilliseconds = require("pretty-ms");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

let sending = false;
let prefix = "."
let chatData = []

let session
try {
  session = JSON.parse(fs.readFileSync('session.json', 'utf8'))
} catch (err) {}

const bot = mineflayer.createBot({
    host: (process.env.SERVER),
    port: (process.env.PORT),
    username: (process.env.EMAIL),
    password: (process.env.PASSWORD),
    version: '1.12.2',
    session
})

//const activities_list = [
  //"with the .help command.", 
  //"with pornhub.com",
  //"with some code", 
  //"with NodeJS",
  //"with ddos scripts"
  //]; // creates an arraylist containing phrases you want your bot to switch through.

  //client.on('ready', () => {
    //setInterval(() => {
        //const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        //client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    //}, 10000); // Runs this every 10 seconds.
//});


bot.on('ready', async => {
  bot.setControlState('forward', true) //bot goes forward for anti-afk PLEASE improve this in a pull request.
})

function LookAtPlayer () {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter)

    if(!playerEntity) return

    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)

}




bot.on('physicTick', LookAtPlayer)

bot.loadPlugin(tpsPlugin)

bot.on("message", async message => {
    let chat = message.toString()
    console.log(chat)
})

const cooldown = new Set();

cmd.allowConsoleInput = true // Optional config argument
bot.loadPlugin(cmd)

bot.on('chat', (username, message) => {
    if (message.startsWith(',')) {
      const command = message.substring(1)
      bot.cmd.run(username, command) // Run with the sender and the command itself
    }
  })

  //function sayCommand (sender, flags, args) {
    //return new Promise((resolve, reject) => {
    //  let message = ''
  //
    //  if (flags.showsender) message += sender + ': '
  //    if (flags.color) message += '&' + flags.color[0]
//
//      message += args.join(' ')
//      bot.chat(message)
//      resolve()
//    })
//  }

  function pog (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
        bot.chat('POG')
        resolve()
        cooldown.add(bot.username);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(bot.username);
        }, 6000);
    }
  })
}

  function MinecraftDay (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`This world has existed for ${bot.time.day} days.`)
      console.log(bot.time.day/365)
      resolve()
        cooldown.add(bot.username);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(bot.username);
        }, 6000);
      }
    })
  }

  function WhatMoonPhase (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`We are on Moon Phase ${bot.time.moonPhase}.`)
      console.log(bot.time.moonPhase/7)
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function KillMe (username, message, rawMessage, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.whisper(username, `Come and kill me ${bot.entity.position}.`)
      console.log(bot.entity.position)
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function slashKill (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`Checking if I can die!.`)
      bot.chat('/suicide')
      console.log()
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function STASH (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`Generated coords to a stash: ${between(1000, 5000000)} ${between(69,256)} ${between(1000, 5000000)} by UpKaz`)
      console.log()
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function howgay (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`${username} is ${between(0, 100)}% gay`)
      console.log()
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function letsgo (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat(`You know it's Baby, ____`)
      console.log()
      resolve()
            cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }


  function tps (username, sender, flags, args) {
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      bot.chat('Current tps: ' + bot.getTps())
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

  function commands (username, message, rawMessage, flags, args){
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      console.log("https://basedbot.cf")
      bot.whisper(username, `Go to https://basedbot.cf for commands`)
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  function help (username, message, rawMessage, flags, args){
    return new Promise((resolve, reject) => {
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{
      console.log("https://basedbot.cf")
      bot.whisper(username, `Go to https://basedbot.cf for commands`)
      console.log()
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }
  
  function uptime (username, sender, flags, args, flags, args){
    return new Promise((resolve, reject) => { 
      if (cooldown.has(bot.username)) {
        bot.whisper(username, "Wait 6 seconds before getting typing this again. - ");
      }else{    
      bot.chat(`Uptime: ${prettyMilliseconds(client.uptime, {compact: true})}`);
      console.log(prettyMilliseconds(client.uptime))
      resolve()
      cooldown.add(bot.username);
      setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown.delete(bot.username);
      }, 6000);
      }
    })
  }

  client.login(process.env.DISCORD_TOKEN)

  client.on("ready", async => {
    console.log("Discord Bot Online")
    client.user.setActivity("on basedbot.cf", {
      type: "STREAMING",
      url: "basedbot.cf"
    });
  });
  
  bot.on("login", async => {
    console.log("Ingame Bot Online")
  })
  
  bot.on("message", message => {
    let channel = client.channels.cache.get(`channel id`)
    if(!channel) return;
    channel.send(`${message}`)
  })
  
  bot.on("message", message =>{
    if(sending == true){
      chatData.push(`${message}`)
    }
  })

  // The best based opinions
  let array = ["Do ?help for some useful commands", "What the fuck is a moomoo?", "SECOND BEST BOT","I can make stashes you know ,stash to make one",
  "How long have Ive been up for? do ,uptime to check for me", "Check out my website lol basedbot,cf", "Im dead on the inside ,help for help please"
  ]
  setInterval(() => {
    bot.chat(array[ Math.floor(Math.random() * array.length)])
    }, 120000)
    Math.floor(Math.random() * array.length - 1,
  )
  
  bot._client.on('update_health', (packet) => {
    bot.health = packet.health
    bot.food = packet.food
    bot.foodSaturation = packet.foodSaturation
    bot.emit('health')
    if (bot.health <= 0) {
      if (bot.isAlive) {
        bot.isAlive = false
        bot.emit('death')
      }
      bot._client.write('client_command', { payload: 0 })
    } else if (bot.health > 0 && !bot.isAlive) {
      bot.isAlive = true
      bot.emit('spawn')
    }
  })


  bot.once('cmd_ready', () => {
    
      // UpperCase
      bot.cmd.registerCommand( 'say'.toUpperCase(), sayCommand,)
      bot.cmd.registerCommand( 'pog'.toUpperCase(), pog,)
      bot.cmd.registerCommand( 'days'.toUpperCase(), MinecraftDay,)
      bot.cmd.registerCommand( 'moonPhase'.toUpperCase(), WhatMoonPhase,)
      bot.cmd.registerCommand( 'kill'.toUpperCase(), KillMe,)
      bot.cmd.registerCommand( '/kill'.toUpperCase(), slashKill,)
      bot.cmd.registerCommand( 'commands'.toUpperCase(), commands,)
      bot.cmd.registerCommand( 'stash'.toUpperCase(), STASH,)
      bot.cmd.registerCommand( 'tps'.toUpperCase(), tps,)
      bot.cmd.registerCommand( 'letsgo'.toUpperCase(), letsgo,)
      bot.cmd.registerCommand( 'howgay?'.toUpperCase(), howgay,)
      bot.cmd.registerCommand( 'help'.toUpperCase(), help,)
      // LowerCase
      bot.cmd.registerCommand( 'say'.toLowerCase(), sayCommand,)
      bot.cmd.registerCommand( 'pog'.toLowerCase(), pog,)
      bot.cmd.registerCommand( 'days'.toLowerCase(), MinecraftDay,)
      bot.cmd.registerCommand( 'moonPhase'.toLowerCase(), WhatMoonPhase,)
      bot.cmd.registerCommand( 'kill'.toLowerCase(), KillMe,)
      bot.cmd.registerCommand( '/kill'.toLowerCase(), slashKill,)
      bot.cmd.registerCommand( 'commands'.toLowerCase(), commands,)
      bot.cmd.registerCommand( 'stash'.toLowerCase(), STASH,)
      bot.cmd.registerCommand( 'tps'.toLowerCase(), tps,)
      bot.cmd.registerCommand( 'letsgo'.toLowerCase(), letsgo,)
      bot.cmd.registerCommand( 'howgay?'.toLowerCase(), howgay,)
      bot.cmd.registerCommand( 'help'.toLowerCase(), help,)
      
  
    // Add a flag called 'color' that expects 1 input
      .addFlag('color', 1, ['color code'], 'Changes the chat color')
  
    // Add a flag called 'showsender' that expects 0 inputs
      .addFlag('showsender', 0, [], 'If present, displays the sender who sent this message')
  })

  client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Visitor');

    guildMember.roles.add(welcomeRole);
  })

  client.on('guildMemberAdd', (member) =>{
    let channelID = 'channel id';
    if (member.guild.id != 'channel id') return;
    let embed = new Discord.MessageEmbed()
    .setTitle(`A Fag Joined`)
    .setDescription(`${member.user.tag} has joined the server`)
    .setColor("RED")
    .setTimestamp()
    client.channels.cache.get(channelID).send(embed)
  })
  
  client.on('message', message =>{
    message.member.roles.cache.has
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping'){
      client.commands.get('ping').execute(message, args);
    }else if (command == 'help'){
      client.commands.get('help').execute(message, args);
    }else if (command == 'kick'){
      client.commands.get('kick').execute(message, args);
    }else if (command == 'ban'){
      client.commands.get('ban').execute(message, args);
    }else if (command == 'balls'){
      client.commands.get('balls').execute(message, args);
    }else if (command == '8ball'){
      client.commands.get('8ball').execute(message, args);
    }else if (command == 'howgay'){
      client.commands.get('howgay').execute(message, args);
    }else if (command == 'meme'){
      client.commands.get('meme').run(message, args);
    }else if (command == 'letsgo'){
      client.commands.get('letsgo').execute(message, args);
    }
  });
    
  client.on('message', async msg => {
    if (msg.channel.id === 'channel id') {
    let args = msg.content.split(" ").slice(1)
    if (msg.content.startsWith(".runcmd")){
      let toSend = args.join(" ");
      if(!toSend) return msg.reply("No args")

      bot.chat(toSend)
      sending = true
      msg.channel.send(`${msg.author.tag} just sent ${toSend}`)
    }
  }
  })

  bot.on('message', message =>{
    if(sending == true){
      chatData.push(`${message}`)
    }
  })
  
  client.on('session', () => {
    console.log(client.session)
    fs.writeFileSync('session.json', JSON.stringify(client.session))
  })

  bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 6969 }) // Start the viewing server on port 3000

      // Draw the path followed by the bot
  const path = [bot.entity.position.clone()]
  bot.on('move', () => {
    if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
      path.push(bot.entity.position.clone())
      bot.viewer.drawLine('path', path)
    }
  })
})
  
  function bindEvents(bot) {

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        process.exit(1)
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
        }
    });
  }
  bot.on('kicked', function(reason) {
    console.log("I got kicked for ", reason, " lol");
    });
  
    bot.on('end', function() {
      console.log("Bot has ended");
      process.exit(1)
  });
  bot.on('error', err => console.log(err));
  
