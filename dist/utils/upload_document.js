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
exports.uploadDocument = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const uploadDocument = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(url, {
        responseType: "stream",
    });
    if (!response)
        throw new Error("getDocument : Document not found");
    const outPutPath = path_1.default.join(config_1.dirDocumentPath, "received", `${Date.now()}.xlsx`);
    const writer = fs_1.default.createWriteStream(outPutPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(outPutPath));
        writer.on("error", reject);
    });
});
exports.uploadDocument = uploadDocument;
//# sourceMappingURL=upload_document.js.map