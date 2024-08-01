import { CellValue, RichText } from "exceljs";

export const extractPlainText = (cellValue: any): string => {
  const httpRegex = /https?:\/\/\S*/;

  let text = extractText(cellValue);
  const match = text.match(httpRegex);
  return match ? match[0] : "";
};

const extractText = (cellValue: CellValue | any): string => {
  if (typeof cellValue === "string") {
    return cellValue;
  }

  if (isRichText(cellValue)) {
    return cellValue.richText.map((part: RichText) => part.text).join("");
  }

  return "";
};

const isRichText = (cellValue: CellValue | any): boolean => {
  return Boolean(
    cellValue && typeof cellValue === "object" && cellValue.richText
  );
};
