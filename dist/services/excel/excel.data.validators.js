"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDataComplete = void 0;
const isDataComplete = (data) => {
    return Boolean(data &&
        data.codes &&
        data.urls &&
        data.yupoo &&
        data.codes.length === data.urls.length);
};
exports.isDataComplete = isDataComplete;
//# sourceMappingURL=excel.data.validators.js.map