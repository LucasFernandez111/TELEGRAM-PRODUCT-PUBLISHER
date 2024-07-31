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
exports.searchExcelFile = exports.readExcelFile = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = require("fs");
const readExcelFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkbook = new exceljs_1.default.Workbook();
    const workbook = yield newWorkbook.xlsx.readFile(filePath);
    return workbook;
});
exports.readExcelFile = readExcelFile;
const searchExcelFile = (path) => (0, fs_1.readdirSync)(path)
    .filter((name) => name.endsWith(".xlsx"))
    .join("");
exports.searchExcelFile = searchExcelFile;
//# sourceMappingURL=read.excel.file.js.map