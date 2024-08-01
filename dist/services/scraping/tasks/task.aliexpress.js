"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskAliexpress = void 0;
const scrape_1 = require("../../../config/scrape");
const custom_error_1 = require("../../../utils/custom.error");
const taskAliexpress = (page, url) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.setUserAgent(scrape_1.userAgent);
    yield page.setCookie(...scrape_1.cookies);
    yield page.goto(url);
    const title = yield page.title();
    if (["Page Not Found - Aliexpress.com", "404 page", ""].includes(title))
        throw new custom_error_1.CustomError("Enlace caido", "❌ Enlace caido: " + url, "taskAliexpress");
    const price = yield page.evaluate(() => {
        var _a;
        return (_a = document.querySelector(".product-price")) === null || _a === void 0 ? void 0 : _a.textContent;
    });
    if (!price)
        return "";
    return price.trim();
});
exports.taskAliexpress = taskAliexpress;
//# sourceMappingURL=task.aliexpress.js.map