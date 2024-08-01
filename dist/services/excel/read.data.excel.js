"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataExcel = void 0;
const filters_1 = require("./filters");
const richtext_1 = require("./richtext");
const validations_1 = require("./validations");
const custom_error_1 = require("../../utils/custom.error");
const readDataExcel = (workbook) => {
    const combinedData = {
        codes: [],
        urls: [],
        yupoo: "",
    };
    workbook.eachSheet((worksheet) => {
        var _a;
        if ((0, validations_1.isEmptyColumns)(worksheet))
            return;
        const isStructured = ((_a = worksheet.getCell("A1").value) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase()) === "CODE";
        const startRow = isStructured ? 2 : 1;
        if (!(0, validations_1.isThirdColumnComplete)(worksheet) || !(0, validations_1.isSingleLinkYupoo)(worksheet))
            throw new custom_error_1.CustomError("Multiples enlaces o vacia en [C1]", "⚠️ Revisa la celda C1 antes de continuar. 📋", "readDataExcel");
        if (!(0, validations_1.isColumnsPair)(worksheet))
            throw new custom_error_1.CustomError("Columnas A y B son impares. ", "⚠️ Las columnas A y B no tienen la misma cantidad de datos 📋", "readDataExcel");
        const columnA1 = (0, filters_1.filterColumn)(worksheet.getColumn(1), startRow);
        const columnB1 = (0, filters_1.filterColumn)(worksheet.getColumn(2), startRow);
        const codes = (0, filters_1.filterCodes)(columnA1);
        const urls = (0, filters_1.filterUrls)(columnB1);
        const yupoo = (0, richtext_1.extractPlainText)(worksheet.getCell("C1").value);
        console.log(yupoo);
        if (!codes || !urls || !yupoo)
            throw new custom_error_1.CustomError("No se encontraron datos en Sheet", "⚠️ Error en los datos: Hay un problema con los datos del archivo Excel. Por favor, revisa y corrige cualquier error antes de reenviarlo. ¡Gracias! 📊", "createExcel");
        if (!(0, validations_1.isLinkYupoo)(yupoo))
            throw new custom_error_1.CustomError("Enlace no correcto en [C1]", "⚠️ Revisa la celda C1 antes de continuar. 📋", "readDataExcel");
        combinedData.codes.push(...codes);
        combinedData.urls.push(...urls);
        combinedData.yupoo = yupoo;
    });
    return combinedData;
};
exports.readDataExcel = readDataExcel;
//# sourceMappingURL=read.data.excel.js.map