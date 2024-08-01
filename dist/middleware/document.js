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
exports.isExcelFile = void 0;
const isExcelFile = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const document = (_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.document;
    if (!document)
        return;
    if (document.mime_type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        return ctx.reply("❌ Documento no válido: El archivo debe ser un Excel (.xlsx o .xls). Por favor, intenta de nuevo. ¡Gracias! 📄");
    yield next();
});
exports.isExcelFile = isExcelFile;
//# sourceMappingURL=document.js.map