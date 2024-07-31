import Excel, { Workbook } from "exceljs";
import { readdirSync } from "fs";

export const readExcelFile = async (filePath: string): Promise<Workbook> => {
  const newWorkbook = new Excel.Workbook();

  const workbook = await newWorkbook.xlsx.readFile(filePath);

  return workbook;
};

export const searchExcelFile = (path: string): string =>
  readdirSync(path)
    .filter((name: string) => name.endsWith(".xlsx"))
    .join("");
