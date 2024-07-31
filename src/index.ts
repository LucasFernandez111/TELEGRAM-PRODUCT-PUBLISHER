import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config";
import { isExcelFile } from "./middleware/document";
import onComposer from "./bot/on";
import actionsComposer from "./bot/actions";

const bot = new Telegraf(BOT_TOKEN);

bot.use(actionsComposer.middleware());
bot.use(isExcelFile); //Middleware para solo aceptar archivos de excel
bot.use(onComposer.middleware());

bot
  .launch({ dropPendingUpdates: true }, () => {
    console.log("Bot iniciado");
  })
  .catch((error) => console.log(error));

// Manejo de señales para detener el bot ordenadamente
process.once("SIGINT", () => {
  console.log("Recibido SIGINT. Deteniendo el bot..."); // Deteniene el bot al recibir CTRL + C
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  console.log("Recibido SIGTERM. Deteniendo el bot...");
  bot.stop("SIGTERM");
});
