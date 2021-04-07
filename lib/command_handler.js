/*
 * ---------------------------------------
 * Alfred - Minecraft Bot | Command Handler
 * ---------------------------------------
 */

 // Dependencies
 const fs = require('fs');
 const path = require('path')


 // Library object
 let lib = {}

 lib.load = (bot) => {
   bot.commands = new Map();
   let commandFiles = fs.readdirSync(path.resolve('.','commands')).filter(file => file.endsWith('.js'));

   for (let file of commandFiles) {
     let command = require(path.resolve('.','commands', file))

     bot.commands.set(command.name, command)
   }
 }

 // Export module
 module.exports = lib
