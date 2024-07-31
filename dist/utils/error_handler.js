"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const handlerError = (err, ctx) => {
    console.warn(err.message);
    if (ctx) {
        ctx.reply("Lo siento... hubo un problema al publicar el documento 😢");
        ctx.reply("Sube el archivo nuevamente");
        ctx.reply(`Descripcion: ${err.message}`);
    }
};
exports.handlerError = handlerError;
//# sourceMappingURL=error_handler.js.map