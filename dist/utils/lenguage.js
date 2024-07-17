"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLanguage = void 0;
const verifyLanguage = (ctx) => {
    var _a;
    const language = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.language_code;
    return language === 'en' ? 'en' : 'es';
};
exports.verifyLanguage = verifyLanguage;
//# sourceMappingURL=lenguage.js.map