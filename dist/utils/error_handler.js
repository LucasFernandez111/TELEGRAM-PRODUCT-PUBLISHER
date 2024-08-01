"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const custom_error_1 = require("./custom.error");
const handlerError = (err, ctx) => {
    if (err instanceof custom_error_1.CustomError) {
        console.warn(`[${err.functionName}] -> ${err.message}`);
        return ctx && ctx.reply(`${err.clientMessage}`);
    }
    console.error(err);
};
exports.handlerError = handlerError;
//# sourceMappingURL=error_handler.js.map