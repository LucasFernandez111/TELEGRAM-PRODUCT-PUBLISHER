import { CellValue, Column } from "exceljs";

/**
 * Filtra los valores nulos y de tipo string o object de una columna
 */
export const filterColumn = (column: Column, startRow: number) =>
  column.values
    .slice(startRow)
    .filter(
      (value: CellValue) =>
        value != null &&
        (typeof value === "string" ||
          typeof value === "object" ||
          typeof value === "number")
    );
export const filterCodes = (columnCodes: any) =>
  columnCodes.map((value: CellValue) => value?.toString());

export const filterUrls = (columnUrls: CellValue[]): string[] =>
  columnUrls
    .map((url: any) => {
      if (typeof url === "object" && "text" in url) {
        return url.text;
      }
      return url;
    })
    .filter(
      (url: any) => typeof url === "string" && url.includes("aliexpress.com")
    );

export const filterYupoo = (columnYupoo: any) =>
  typeof columnYupoo === "object" && "text" in columnYupoo
    ? columnYupoo.text
    : (columnYupoo as string);
