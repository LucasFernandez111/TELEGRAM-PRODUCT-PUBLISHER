"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataExcel = void 0;
const filters_1 = require("./filters");
const readDataExcel = (workbook) => {
    const combinedData = {
        codes: [],
        urls: [],
        yupoo: "",
    };
    workbook.eachSheet((worksheet) => {
        var _a;
        const columnsWithData = worksheet.actualColumnCount.valueOf();
        if (!columnsWithData)
            return;
        const isStructured = ((_a = worksheet.getCell("A1").value) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase()) === "CODE";
        const startRow = isStructured ? 2 : 1;
        const columnA1 = (0, filters_1.filterColumn)(worksheet.getColumn(1), startRow);
        const columnB1 = (0, filters_1.filterColumn)(worksheet.getColumn(2), startRow);
        const cellC1 = worksheet.getCell("C1").value;
        if (!cellC1) {
            throw new Error("Error en C1: Celda vacía");
        }
        const codes = (0, filters_1.filterCodes)(columnA1);
        const urls = (0, filters_1.filterUrls)(columnB1);
        const yupoo = (0, filters_1.filterYupoo)(cellC1);
        if (!codes || !urls || !yupoo) {
            throw new Error("Error en los datos");
        }
        combinedData.codes.push(...codes);
        combinedData.urls.push(...urls);
        combinedData.yupoo = yupoo;
    });
    return combinedData;
};
exports.readDataExcel = readDataExcel;
//# sourceMappingURL=read.data.excel.js.map