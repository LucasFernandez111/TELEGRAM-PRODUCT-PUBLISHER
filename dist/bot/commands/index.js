"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const publicar_1 = __importDefault(require("./publicar"));
const commandsComposer = new telegraf_1.Composer();
commandsComposer.command('publicar', publicar_1.default);
exports.default = commandsComposer;
//# sourceMappingURL=index.js.map