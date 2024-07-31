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
const create_excel_1 = require("../../services/excel/create.excel");
const read_data_excel_1 = require("../../services/excel/read.data.excel");
const read_excel_file_1 = require("../../services/excel/read.excel.file");
const path = "C:\\Users\\Lucas\\Desktop\\TELEGRAM-BOT-ADMIN\\src\\test\\excel\\7.30 (2).xlsx";
function main(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const workbook = yield (0, read_excel_file_1.readExcelFile)(path);
            const data = (0, read_data_excel_1.readDataExcel)(workbook);
        }
        catch (error) {
            console.log(error);
        }
    });
}
const testCreateExcel = (dataSheet) => console.log((0, create_excel_1.createExcel)(dataSheet));
testCreateExcel([
    {
        codes: [
            "B1833",
            "B1838",
            "B2216",
            "B2266",
            "B2324",
            "B2421",
            "B2517",
            "B2633",
            "B2697",
            "B2854",
            "B2921",
            "B3087",
            "B3155",
            "B3305",
            "B3307",
            "B3368",
            "B3395",
            "B3396",
            "B3443",
            "B3449",
            "B3506",
            "B3523",
            "B3537",
            "B3550",
            "B3559",
            "B3571",
            "B3954",
            "B4093",
            "B4094",
            "B4095",
            "B7085",
            "M70302 ",
            "M73007 ",
        ],
        urls: [
            "https://www.aliexpress.com/item/3256807271136130.html",
            "https://www.aliexpress.com/item/3256807271437886.html",
            "https://www.aliexpress.com/item/3256807271366725.html",
            "https://www.aliexpress.com/item/3256807271515489.html",
            "https://www.aliexpress.com/item/3256807271249018.html",
            "https://www.aliexpress.com/item/3256807271385777.html",
            "https://www.aliexpress.com/item/3256807271293929.html",
            "https://www.aliexpress.com/item/3256807271149214.html",
            "https://www.aliexpress.com/item/3256807271349874.html",
            "https://www.aliexpress.com/item/3256807271662252.html",
            "https://www.aliexpress.com/item/3256807271377901.html",
            "https://www.aliexpress.com/item/3256807271635341.html",
            "https://www.aliexpress.com/item/3256807271583498.html",
            "https://www.aliexpress.com/item/3256807271645350.html",
            "https://www.aliexpress.com/item/3256807271356944.html",
            "https://www.aliexpress.com/item/3256807271585565.html",
            "https://www.aliexpress.com/item/3256807271563587.html",
            "https://www.aliexpress.com/item/3256807271249206.html",
            "https://www.aliexpress.com/item/3256807271260144.html",
            "https://www.aliexpress.com/item/3256807271437886.html",
            "https://www.aliexpress.com/item/3256807271514754.html",
            "https://www.aliexpress.com/item/3256807271707319.html",
            "https://www.aliexpress.com/item/3256807271717329.html",
            "https://www.aliexpress.com/item/3256807271503805.html",
            "https://www.aliexpress.com/item/3256807274310565.html",
            "https://www.aliexpress.com/item/3256807271430978.html",
            "https://www.aliexpress.com/item/3256807271691432.html",
            "https://www.aliexpress.com/item/3256807271399080.html",
            "https://www.aliexpress.com/item/3256807271559746.html",
            "https://www.aliexpress.com/item/3256807271374078.html",
            "https://www.aliexpress.com/item/3256807271468938.html",
            "https://www.aliexpress.com/item/1005007457871686.html",
            "https://www.aliexpress.com/item/1005007457953674.html",
        ],
        yupoo: "https://www.aliexpress.com/item/1005007457953674.html",
    },
]);
//# sourceMappingURL=excel.test.js.map