"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const lenguage_1 = require("./lenguage");
const locales_1 = require("../locales/locales");
const telegraf_1 = require("telegraf");
const handleResponse = (ctx, message, type, buttons) => {
    var _a, _b;
    const language = (0, lenguage_1.verifyLanguage)(ctx);
    const response = ((_b = (_a = locales_1.locales[language]) === null || _a === void 0 ? void 0 : _a[message]) === null || _b === void 0 ? void 0 : _b[type]) || "Unknown message type";
    if (buttons)
        return ctx.reply(response, telegraf_1.Markup.keyboard(buttons).resize().oneTime());
    return ctx.reply(response);
};
exports.handleResponse = handleResponse;
//# sourceMappingURL=response_handler.js.map