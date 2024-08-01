"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPost = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const custom_error_1 = require("./custom.error");
const botGroup = new telegraf_1.Telegraf(config_1.BOT_GROUP);
const sendPost = (price, url, href, pathImage) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pathImage || !price || !url || !href)
        throw new custom_error_1.CustomError("No hay imagen | precio | url |  href para enviar la publicacion ", "Ocurrió un error al publicar los productos. Por favor, inténtalo de nuevo más tarde.  🛍️", "sendPost");
    yield botGroup.telegram.sendPhoto(config_1.ID_GROUP, {
        source: pathImage,
    }, {
        caption: `<b>🔥NUEVA OFERTA EXCLUSIVA DEL CANAL DE VENTAS🔥</b>
                \nHoy nuestra tienda de importaciones 🕵️ te trae un nuevo producto 🏴‍☠️. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
                \n<b>MUY IMPORTANTE</b>
                \n• NOS DEBES DE ENVIAR EL NUMERO DE LA COMPRA PARA REGISTRARLA EN LA BASE DE DATOS Y ASÍ EVITAR PROBLEMAS DE ENVÍO.
                \n• ADEMÁS, TEN EN CUENTA QUE LOS ENLACES PUEDEN CADUCAR POR ELLO APROVECHA LA OFERTA EN EL MOMENTO VEAS ESTE MENSAJE.
                \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
                \n✅${price}✅
                \n<b>🔥Acuérdate de enviarnos el NUMERO DEL PEDIDO Y PONER EL CODIGO Chollazo2.0🔥</b>
                \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫\n\nPara <b>COMPRAR</b>, puedes dirigirte al GROUP @Joselu_asistente_bot 🤖`,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "Comprar producto", url: `${url}` }],
                [{ text: "Mas imagenes ", url: `${href}` }],
            ],
        },
    });
});
exports.sendPost = sendPost;
//# sourceMappingURL=send.post.js.map