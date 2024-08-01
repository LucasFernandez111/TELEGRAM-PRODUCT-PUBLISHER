"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const { message } = require("telegraf/filters");
const document_1 = __importDefault(require("./document"));
const onComposer = new telegraf_1.Composer();
onComposer.on(message("document"), document_1.default);
exports.default = onComposer;
//# sourceMappingURL=index.js.map