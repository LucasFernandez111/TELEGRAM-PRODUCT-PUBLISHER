import { Worksheet, CellValue, Column } from "exceljs";

export const isThirdColumnComplete = (worksheet: Worksheet) =>
  Boolean(worksheet.getCell("C1").value);

export const isSingleLinkYupoo = (worksheet: Worksheet) =>
  Boolean(
    worksheet
      .getColumn(3)
      .values.filter(
        (value: CellValue) => value != null && value != "" && value != undefined
      ).length === 1
  );

export const isStructured = (worksheet: Worksheet) =>
  Boolean(worksheet.getCell("A1").value?.toString().toUpperCase() === "CODE");
export const isLinkYupoo = (cell: CellValue) =>
  Boolean(cell && cell.toString().toUpperCase().includes("YUPOO.COM"));

export const isColumnsPair = (worksheet: Worksheet) =>
  Boolean(
    worksheet
      .getColumn(1)
      .values.filter(
        (value: CellValue) => value != null && value != "" && value != undefined
      ).length ===
      worksheet
        .getColumn(2)
        .values.filter(
          (value: CellValue) =>
            value != null && value != "" && value != undefined
        ).length
  );

//Valida que las columnas no esten vacias
export const isEmptyColumns = (worksheet: Worksheet) =>
  Boolean(worksheet.actualColumnCount.valueOf() === 0);
