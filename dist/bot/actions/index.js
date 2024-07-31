"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const query_publish_1 = __importDefault(require("./query.publish"));
const remove_files_1 = require("../../utils/remove.files");
const config_1 = require("../../config");
const actionsComposer = new telegraf_1.Composer();
actionsComposer.action("publish", query_publish_1.default);
actionsComposer.action("cancel_publish", (ctx) => {
    ctx.deleteMessage();
    (0, remove_files_1.removeFiles)(config_1.receivedPath);
});
exports.default = actionsComposer;
//# sourceMappingURL=index.js.map