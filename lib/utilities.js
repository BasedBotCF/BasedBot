/*
 * ---------------------------------------
 * A.L.F.R.E.D | Minecraft Bot: Utilities
 * ---------------------------------------
 */

 // Dependencies

 // Define utilities object
 var utils = {}

 utils.itemToString = (item) => {
   if (item) {
     return `${item.name} x ${item.count}`
   } else {
     return '(nothing)'
   }
 }

 utils.itemByName = (bot, name) => {
   return bot.inventory.items().filter(items => items.name === name)[0]
 }

 // Export Module
 module.exports = utils
