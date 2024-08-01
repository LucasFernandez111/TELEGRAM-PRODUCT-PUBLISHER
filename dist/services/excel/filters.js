"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterYupoo = exports.filterUrls = exports.filterCodes = exports.filterColumn = void 0;
const filterColumn = (column, startRow) => column.values
    .slice(startRow)
    .filter((value) => value != null &&
    (typeof value === "string" ||
        typeof value === "object" ||
        typeof value === "number"));
exports.filterColumn = filterColumn;
const filterCodes = (columnCodes) => columnCodes.map((value) => value === null || value === void 0 ? void 0 : value.toString().trim());
exports.filterCodes = filterCodes;
const filterUrls = (columnUrls) => columnUrls
    .map((url) => {
    if (typeof url === "object" && "text" in url) {
        return url.text;
    }
    return url;
})
    .filter((url) => typeof url === "string" &&
    url.includes("https://www.aliexpress.com/item/"));
exports.filterUrls = filterUrls;
const filterYupoo = (columnYupoo) => typeof columnYupoo === "object" && "text" in columnYupoo
    ? columnYupoo.text
    : columnYupoo;
exports.filterYupoo = filterYupoo;
//# sourceMappingURL=filters.js.map