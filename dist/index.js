"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_1 = require("./config");
const document_1 = require("./middleware/document");
const on_1 = __importDefault(require("./bot/on"));
const actions_1 = __importDefault(require("./bot/actions"));
const bot = new telegraf_1.Telegraf(config_1.BOT_TOKEN);
bot.use(actions_1.default.middleware());
bot.use(document_1.isExcelFile);
bot.use(on_1.default.middleware());
bot
    .launch({ dropPendingUpdates: true }, () => {
    console.log("Bot iniciado");
})
    .catch((error) => console.log(error));
process.once("SIGINT", () => {
    console.log("Recibido SIGINT. Deteniendo el bot...");
    bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
    console.log("Recibido SIGTERM. Deteniendo el bot...");
    bot.stop("SIGTERM");
});
//# sourceMappingURL=index.js.map