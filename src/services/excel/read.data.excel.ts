import { CellRichTextValue, CellValue, Workbook, Worksheet } from "exceljs";
import { DataSheet } from "../../interfaces/excel.interfaces";
import { filterCodes, filterColumn, filterUrls, filterYupoo } from "./filters";
import { isRichValue, richToString } from "./richtext";

export const readDataExcel = (workbook: Workbook): DataSheet => {
  const combinedData: DataSheet = {
    codes: [],
    urls: [],
    yupoo: "",
  };

  workbook.eachSheet((worksheet: Worksheet) => {
    const columnsWithData = worksheet.actualColumnCount.valueOf();
    if (!columnsWithData) return;

    const isStructured =
      worksheet.getCell("A1").value?.toString().toUpperCase() === "CODE";

    const startRow = isStructured ? 2 : 1;

    const columnA1 = filterColumn(worksheet.getColumn(1), startRow);
    const columnB1 = filterColumn(worksheet.getColumn(2), startRow);
    const cellC1 = worksheet.getCell("C1").value;

    if (!cellC1) {
      throw new Error("Error en C1: Celda vacía");
    }

    const codes = filterCodes(columnA1);
    const urls = filterUrls(columnB1);
    const yupoo = filterYupoo(cellC1);

    if (!codes || !urls || !yupoo) {
      throw new Error("Error en los datos");
    }

    combinedData.codes.push(...codes);
    combinedData.urls.push(...urls);
    combinedData.yupoo = yupoo;
  });

  return combinedData;
};
