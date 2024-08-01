"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlainText = void 0;
const extractPlainText = (cellValue) => {
    const httpRegex = /https?:\/\/\S*/;
    let text = extractText(cellValue);
    const match = text.match(httpRegex);
    return match ? match[0] : "";
};
exports.extractPlainText = extractPlainText;
const extractText = (cellValue) => {
    if (typeof cellValue === "string") {
        return cellValue;
    }
    if (isRichText(cellValue)) {
        return cellValue.richText.map((part) => part.text).join("");
    }
    return "";
};
const isRichText = (cellValue) => {
    return Boolean(cellValue && typeof cellValue === "object" && cellValue.richText);
};
//# sourceMappingURL=richtext.js.map