"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.richToString = exports.isRichValue = void 0;
const isRichValue = (value) => {
    return Boolean(value && Array.isArray(value.richText));
};
exports.isRichValue = isRichValue;
const richToString = (rich) => rich.richText
    .map(({ text }) => text)
    .filter((text) => text.includes("yupoo.com"))
    .join("");
exports.richToString = richToString;
//# sourceMappingURL=richtext.js.map