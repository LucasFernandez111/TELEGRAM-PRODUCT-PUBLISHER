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
const upload_document_1 = require("../../utils/upload_document");
const get_file_url_1 = require("../../utils/get_file_url");
const telegraf_1 = require("telegraf");
exports.default = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = ctx.msg.document;
        const { file_id } = document;
        const { file_path } = yield ctx.telegram.getFile(file_id);
        const fileUrl = (0, get_file_url_1.getFileUrl)(file_path);
        yield (0, upload_document_1.uploadDocument)(fileUrl);
        ctx.reply("¿Deseas publicarlo? 📤", telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("✅", "publish"),
            telegraf_1.Markup.button.callback("❌", "cancel_publish"),
        ]));
    }
    catch (error) {
        console.log(error);
    }
    1;
});
//# sourceMappingURL=document.js.map