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
exports.clusterImages = void 0;
const puppeteer_cluster_1 = require("puppeteer-cluster");
const task_get_images_1 = require("../tasks/task.get.images");
const error_handler_1 = require("../../../utils/error_handler");
const clusterImages = (urls, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const cluster = yield puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 1,
        puppeteerOptions: {
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-zygote"],
        },
    });
    yield cluster.task((_a) => __awaiter(void 0, [_a], void 0, function* ({ page, data: url }) {
        try {
            const imgPath = yield (0, task_get_images_1.taskGetImages)({ page, url });
            const existingEntry = results.find((entry) => entry.url === url);
            if (!existingEntry)
                return results.push({ url, images: imgPath });
            existingEntry.images = imgPath;
        }
        catch (error) {
            (0, error_handler_1.handlerError)(error, ctx);
        }
    }));
    urls.forEach(({ href }) => cluster.queue(href));
    yield cluster.idle();
    yield cluster.close();
    return results;
});
exports.clusterImages = clusterImages;
//# sourceMappingURL=clusters.images.js.map