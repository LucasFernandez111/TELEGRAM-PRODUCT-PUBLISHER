"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const handlerError = (err, ctx) => {
    if (err instanceof CustomError) {
        console.warn(`[${err.functionName}] -> ${err.message}`);
        return ctx && ctx.reply(`${err.clientMessage}`);
    }
    console.error(err);
};
exports.handlerError = handlerError;
//# sourceMappingURL=error_handler.js.map