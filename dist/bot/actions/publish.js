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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
const read_excel_file_1 = require("../../services/excel/read.excel.file");
const path_1 = __importDefault(require("path"));
const read_data_excel_1 = require("../../services/excel/read.data.excel");
exports.default = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filesName = fs_1.default
            .readdirSync(config_1.dirDocumentPath)
            .filter((name) => name.endsWith(".xlsx"));
        if (filesName.length === 0)
            throw new Error("No hay archivos para publicar");
        const documentPath = path_1.default.join(config_1.dirDocumentPath, filesName[0]);
        const workbook = yield (0, read_excel_file_1.readExcelFile)(documentPath);
        const data = (0, read_data_excel_1.readDataExcel)(workbook);
        console.log(data);
        console.log(data);
    }
    catch (error) {
        console.info(error);
        ctx.reply("Lo siento... hubo un error al publicar el documento 😢");
    }
});
//# sourceMappingURL=publish.js.map