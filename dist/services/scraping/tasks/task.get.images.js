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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskGetImages = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = require("../../../config");
const taskGetImages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, url, }) {
    try {
        yield page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 3,
        });
        yield page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        yield page.waitForSelector("img.autocover", {
            timeout: 30000,
            visible: true,
        });
        const elementImage = yield page.$("img.autocover");
        if (!elementImage) {
            const errorMessage = `[getImages] No se encontró el elemento en ${url}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const urlParts = url.split("/");
        const baseName = (urlParts.pop() || "").split("?")[0];
        const uniqueName = `${baseName}-${Date.now()}.png`;
        const pathRelative = path_1.default.resolve(config_1.imagesBasePath, uniqueName);
        const boundingBox = yield elementImage.boundingBox();
        if (!boundingBox) {
            const errorMessage = `[getImages] No se pudo obtener el bounding box del elemento en ${url}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        yield page.screenshot({
            path: pathRelative,
            clip: {
                x: boundingBox.x,
                y: boundingBox.y,
                width: boundingBox.width,
                height: boundingBox.height,
            },
        });
        return pathRelative;
    }
    catch (error) {
        console.error(`[getImages] Error procesando la URL: ${url}`, error);
        throw new Error(`[getImages] Error procesando la URL: ${url}`);
    }
});
exports.taskGetImages = taskGetImages;
//# sourceMappingURL=task.get.images.js.map