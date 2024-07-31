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
exports.taskYupoo = void 0;
const taskYupoo = (page, url, codes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page.goto(`${url}search/album?uid=1&sort=&q=${codes.join(",")}`, {
            waitUntil: "networkidle2",
            timeout: 60000,
        });
        yield page.waitForSelector(".album__title", {
            timeout: 30000,
            visible: true,
        });
        yield page.waitForSelector("a.album__main", {
            timeout: 30000,
            visible: true,
        });
        const results = [];
        for (const code of codes) {
            try {
                const element = yield page.$(`a[title="${code}"]`);
                if (!element) {
                    console.warn(`No se encontró el elemento para el código: ${code}`);
                    continue;
                }
                const href = yield page.evaluate((el) => el.getAttribute("href"), element);
                const titleCode = yield page.evaluate((el) => el.getAttribute("title"), element);
                if (!href || !titleCode) {
                    console.warn(`Elemento encontrado pero sin href o title para el código: ${code}`);
                    continue;
                }
                results.push({ titleCode, href: new URL(href, url).toString() });
            }
            catch (error) {
                console.error(`Error procesando el código: ${code} en la URL: ${url}`, error);
            }
        }
        return results;
    }
    catch (err) {
        console.error(`Error en taskYupoo para la URL: ${url} y códigos: ${codes.join(", ")}`, err);
        throw new Error(`No se encontraron los elementos para los códigos: ${codes.join(", ")} en ${url}`);
    }
});
exports.taskYupoo = taskYupoo;
//# sourceMappingURL=taks.yupoo.js.map