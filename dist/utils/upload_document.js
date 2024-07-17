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
const uploadDocument = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(url, { responseType: 'stream' });
    if (!response)
        throw new Error("getDocument : Document not found");
    const outPutPath = path_1.default.join(__dirname, '..', '..', 'uploads', 'documents', `${Date.now()}.xlsx`);
    console.log(outPutPath);
    console.log(outPutPath);
    const writeStream = fs_1.default.createWriteStream(outPutPath);
    response.data.pipe(writeStream);
    return outPutPath;
});
exports.uploadDocument = uploadDocument;
//# sourceMappingURL=upload_document.js.map