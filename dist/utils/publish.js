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
exports.publish = void 0;
const cluster_aliexpress_1 = require("../services/scraping/clusters/cluster.aliexpress");
const cluster_yupoo_1 = require("../services/scraping/clusters/cluster.yupoo");
const clusters_images_1 = require("../services/scraping/clusters/clusters.images");
const format_1 = require("../utils/format");
const send_post_1 = require("./send.post");
const publish = (dataSheet, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageProgress = yield (ctx === null || ctx === void 0 ? void 0 : ctx.reply("🔄 Obteniendo datos Aliexpress..."));
        const prices = yield (0, cluster_aliexpress_1.clusterAliexpress)(dataSheet.urls);
        const pricesAndCodes = prices.map((price, index) => ({
            price,
            code: dataSheet.codes[index],
            url: dataSheet.urls[index],
        }));
        yield (ctx === null || ctx === void 0 ? void 0 : ctx.telegram.editMessageText(messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.chat.id, messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.message_id, "", ` Obteniendo códigos de Yupoo 🔍📲
`));
        const imagesUrls = yield (0, cluster_yupoo_1.clusterYupoo)(dataSheet.yupoo, dataSheet.codes);
        const imagesPath = yield (0, clusters_images_1.clusterImages)(imagesUrls);
        yield (ctx === null || ctx === void 0 ? void 0 : ctx.telegram.editMessageText(messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.chat.id, messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.message_id, "", `Reopilando imagenes de Yupoo 📸...`));
        const combinedData = (0, format_1.combineData)(pricesAndCodes, imagesUrls, imagesPath);
        yield (ctx === null || ctx === void 0 ? void 0 : ctx.telegram.editMessageText(messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.chat.id, messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.message_id, "", `✅📋 Publicando ${pricesAndCodes.length} productos.`));
        for (const data of combinedData) {
            if (data) {
                yield (0, send_post_1.sendPost)(data.price, data.url, data.href, data.images);
            }
        }
        yield (ctx === null || ctx === void 0 ? void 0 : ctx.telegram.editMessageText(messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.chat.id, messageProgress === null || messageProgress === void 0 ? void 0 : messageProgress.message_id, "", "Publicación completada 🛍️✨"));
    }
    catch (error) {
        console.error("Error en el proceso de publicación:", error);
        if (ctx) {
            yield ctx.reply(`Error en el proceso de publicación: ${error.message}`);
        }
    }
});
exports.publish = publish;
//# sourceMappingURL=publish.js.map