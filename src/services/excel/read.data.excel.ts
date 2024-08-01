import { Workbook, Worksheet } from "exceljs";
import { DataSheet } from "../../interfaces/excel.interfaces";
import { filterCodes, filterColumn, filterUrls } from "./filters";
import { extractPlainText } from "./richtext";
import {
  isColumnsPair,
  isEmptyColumns,
  isLinkYupoo,
  isSingleLinkYupoo,
  isThirdColumnComplete,
} from "./validations";
import { CustomError } from "../../utils/custom.error";

export const readDataExcel = (workbook: Workbook): DataSheet => {
  const combinedData: DataSheet = {
    codes: [],
    urls: [],
    yupoo: "",
  };

  workbook.eachSheet((worksheet: Worksheet) => {
    if (isEmptyColumns(worksheet)) return;

    const isStructured =
      worksheet.getCell("A1").value?.toString().toUpperCase() === "CODE";

    const startRow = isStructured ? 2 : 1;

    if (!isThirdColumnComplete(worksheet) || !isSingleLinkYupoo(worksheet))
      throw new CustomError(
        "Multiples enlaces o vacia en [C1]",
        "⚠️ Revisa la celda C1 antes de continuar. 📋",
        "readDataExcel"
      );

    if (!isColumnsPair(worksheet))
      throw new CustomError(
        "Columnas A y B son impares. ",
        "⚠️ Las columnas A y B no tienen la misma cantidad de datos 📋",
        "readDataExcel"
      );

    const columnA1 = filterColumn(worksheet.getColumn(1), startRow);
    const columnB1 = filterColumn(worksheet.getColumn(2), startRow);

    const codes = filterCodes(columnA1);
    const urls = filterUrls(columnB1);
    const yupoo = extractPlainText(worksheet.getCell("C1").value);

    console.log(yupoo);

    if (!codes || !urls || !yupoo)
      throw new CustomError(
        "No se encontraron datos en Sheet",
        "⚠️ Error en los datos: Hay un problema con los datos del archivo Excel. Por favor, revisa y corrige cualquier error antes de reenviarlo. ¡Gracias! 📊",
        "createExcel"
      );

    if (!isLinkYupoo(yupoo))
      throw new CustomError(
        "Enlace no correcto en [C1]",
        "⚠️ Revisa la celda C1 antes de continuar. 📋",
        "readDataExcel"
      );

    combinedData.codes.push(...codes);
    combinedData.urls.push(...urls);
    combinedData.yupoo = yupoo;
  });

  return combinedData;
};
