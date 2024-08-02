import { CellValue, RichText } from "exceljs";

export const extractPlainText = (cellValue: any): string => {
  const httpRegex = /https?:\/\/\S*/;

  if (typeof cellValue === "string") {
    return cellValue;
  }
  if (isRichText(cellValue)) {
    const text = cellValue.richText.map((part: RichText) => part.text).join("");

    const match = text.match(httpRegex);

    return match ? match[0] : "";
  }

  return cellValue?.text || "";
};

const isRichText = (cellValue: CellValue): boolean =>
  Boolean(
    cellValue && typeof cellValue === "object" && "richText" in cellValue
  );
