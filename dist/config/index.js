"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesBasePath = exports.receivedPath = exports.generatedPath = exports.dirDocumentPath = exports.ID_GROUP = exports.BOT_GROUP = exports.BOT_TOKEN = void 0;
const path_1 = __importDefault(require("path"));
exports.BOT_TOKEN = (_a = process.env.BOT_TOKEN) !== null && _a !== void 0 ? _a : "";
exports.BOT_GROUP = (_b = process.env.BOT_GROUP) !== null && _b !== void 0 ? _b : "";
exports.ID_GROUP = (_c = process.env.ID_GROUP) !== null && _c !== void 0 ? _c : "";
exports.dirDocumentPath = path_1.default.join(__dirname, "..", "..", "uploads", "documents");
exports.generatedPath = path_1.default.join(exports.dirDocumentPath, "generated");
exports.receivedPath = path_1.default.join(exports.dirDocumentPath, "received");
exports.imagesBasePath = path_1.default.join(__dirname, "..", "..", "uploads", "images");
//# sourceMappingURL=index.js.map