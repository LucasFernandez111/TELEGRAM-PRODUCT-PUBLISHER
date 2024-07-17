"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileUrl = void 0;
const config_1 = require("../config");
const getFileUrl = (filePath) => `https://api.telegram.org/file/bot${config_1.BOT_TOKEN}/${filePath}`;
exports.getFileUrl = getFileUrl;
//# sourceMappingURL=get_file_url.js.map