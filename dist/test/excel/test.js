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
const read_data_excel_1 = require("../../services/excel/read.data.excel");
const read_excel_file_1 = require("../../services/excel/read.excel.file");
function testExtractorData(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const workbook = yield (0, read_excel_file_1.readExcelFile)(path);
        return yield (0, read_data_excel_1.readDataExcel)(workbook);
    });
}
testExtractorData("C:/Users/Lucas/Desktop/TELEGRAM-BOT-ADMIN/src/test/excel/test.xlsx").then((res) => console.log(res));
//# sourceMappingURL=test.js.map