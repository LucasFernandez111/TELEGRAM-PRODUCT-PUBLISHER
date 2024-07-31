"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingElements = exports.getFirstFiveElements = void 0;
const getFirstFiveElements = (dataSheet) => {
    if (!(dataSheet === null || dataSheet === void 0 ? void 0 : dataSheet.codes) || !(dataSheet === null || dataSheet === void 0 ? void 0 : dataSheet.urls)) {
        throw new Error("Invalid dataSheet: codes or urls are undefined");
    }
    const firstFiveCodes = dataSheet.codes.slice(0, 5);
    const firstFiveUrls = dataSheet.urls.slice(0, 5);
    return {
        codes: firstFiveCodes,
        urls: firstFiveUrls,
        yupoo: dataSheet.yupoo,
    };
};
exports.getFirstFiveElements = getFirstFiveElements;
const getRemainingElements = (dataSheet) => {
    if (!(dataSheet === null || dataSheet === void 0 ? void 0 : dataSheet.codes) || !(dataSheet === null || dataSheet === void 0 ? void 0 : dataSheet.urls)) {
        throw new Error("Invalid dataSheet: codes or urls are undefined");
    }
    const remainingCodes = dataSheet.codes.slice(5);
    const remainingUrls = dataSheet.urls.slice(5);
    return {
        codes: remainingCodes,
        urls: remainingUrls,
        yupoo: dataSheet.yupoo,
    };
};
exports.getRemainingElements = getRemainingElements;
//# sourceMappingURL=data.excel.js.map