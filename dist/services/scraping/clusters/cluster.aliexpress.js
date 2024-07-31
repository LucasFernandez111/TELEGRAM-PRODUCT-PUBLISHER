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
exports.clusterAliexpress = void 0;
const puppeteer_cluster_1 = require("puppeteer-cluster");
const task_aliexpress_1 = require("../tasks/task.aliexpress");
const clusterAliexpress = (urls, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const prices = [];
    const cluster = yield puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 1,
        puppeteerOptions: {
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-zygote"],
        },
    });
    cluster.task((_a) => __awaiter(void 0, [_a], void 0, function* ({ page, data: url }) {
        try {
            const price = yield (0, task_aliexpress_1.taskAliexpress)(page, url);
            prices.push(price);
        }
        catch (error) {
            console.error(`Error processing URL: ${url}`, error);
            if (ctx) {
                yield ctx.reply(error === null || error === void 0 ? void 0 : error.message);
            }
        }
    }));
    for (const url of urls) {
        yield cluster.queue(url);
    }
    yield cluster.idle();
    yield cluster.close();
    return prices;
});
exports.clusterAliexpress = clusterAliexpress;
//# sourceMappingURL=cluster.aliexpress.js.map