import Excel from "exceljs";

import { DataSheet } from "../../interfaces/excel.interfaces";
import { generatedPath } from "../../config";
import path from "path";

export const createExcel = async (dataSheet: DataSheet) => {
  const { codes, urls, yupoo } = dataSheet;

  if (!codes || !urls || !yupoo) throw new Error("Error en los datos");
  const workbook = new Excel.Workbook();

  const workSheet = workbook.addWorksheet("Sheet 1");

  workSheet.getColumn(1).values = codes;
  workSheet.getColumn(2).values = urls;
  workSheet.getCell("C1").value = yupoo;

  const filePath = path.join(generatedPath, `${Date.now()}.xlsx`);
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};
