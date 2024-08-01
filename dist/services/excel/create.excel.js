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
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    const headers = ["CODE", "Aliexpress link", yupoo];
    headers.forEach((header, index) => {
        worksheet.getColumn(index + 1).header = header;
        styleColumn(worksheet.getColumn(index + 1), header);
    });
    worksheet.getColumn(1).values = codes;
    worksheet.getColumn(2).values = urls;
    const filePath = generateFileName();
    yield workbook.xlsx.writeFile(filePath);
    return filePath;
});
exports.createExcel = createExcel;
function styleColumn(column, header) {
    column.eachCell((cell) => {
        cell.style = {
            font: { color: { argb: "FFFFFFFF" }, bold: true },
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF0000FF" },
            },
            alignment: { horizontal: "center" },
        };
    });
    column.width = header.length < 12 ? 12 : header.length;
}
function generateFileName() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const fileName = `${hours}-${minutes}.xlsx`;
    return path_1.default.join(config_1.generatedPath, fileName);
}
//# sourceMappingURL=create.excel.js.map