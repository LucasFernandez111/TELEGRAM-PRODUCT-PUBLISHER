import { Telegraf } from "telegraf"
import { BOT_TOKEN } from "./config";
import commandsComposer from "./bot/commands";
import { isExcelFile } from "./middleware/document";
import onComposer from "./bot/on";

const bot = new Telegraf(BOT_TOKEN)


bot.use(isExcelFile) 
bot.use(onComposer.middleware())
bot.use(commandsComposer.middleware())



bot.launch({dropPendingUpdates: true},()=>{
  console.log('Bot iniciado')
}).catch((error) => console.log(error));

// Manejo de señales para detener el bot ordenadamente
process.once('SIGINT', () => {
  console.log('Recibido SIGINT. Deteniendo el bot...');     // Deteniene el bot al recibir CTRL + C
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('Recibido SIGTERM. Deteniendo el bot...');  
  bot.stop('SIGTERM');
});


