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
exports.createExcel = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const config_1 = require("../../config");
const path_1 = __importDefault(require("path"));
const createExcel = (dataSheet) => __awaiter(void 0, void 0, void 0, function* () {
    const { codes, urls, yupoo } = dataSheet;
    if (!codes || !urls || !yupoo)
        throw new CustomError("No se encontraron datos en Sheet", "⚠️ Error en los datos: Hay un problema con los datos del archivo Excel. Por favor, revisa y corrige cualquier error antes de reenviarlo. ¡Gracias! 📊", "createExcel");
    const workbook = new exceljs_1.default.Workbook();
    const workSheet = workbook.addWorksheet("Sheet 1");
    workSheet.getColumn(1).values = codes;
    workSheet.getColumn(2).values = urls;
    workSheet.getCell("C1").value = yupoo;
    const filePath = path_1.default.join(config_1.generatedPath, `${Date.now()}.xlsx`);
    yield workbook.xlsx.writeFile(filePath);
    return filePath;
});
exports.createExcel = createExcel;
//# sourceMappingURL=create.excel.js.map