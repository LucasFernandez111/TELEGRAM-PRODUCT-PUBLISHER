import { Cluster } from "puppeteer-cluster";
import { taskGetImages } from "../tasks/task.get.images";
import { Context } from "telegraf";
import { handlerError } from "../../../utils/error_handler";
import { CustomError } from "../../../utils/custom.error";

export const clusterImages = async (
  urls: { href: string }[],
  ctx?: Context
) => {
  const results: { url: string; images: string }[] = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    puppeteerOptions: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-zygote"],
    },
  });

  await cluster.task(
    async ({ page, data: url }: { page: any; data: string }) => {
      try {
        const imgPath = await taskGetImages({ page, url });
        const existingEntry = results.find((entry) => entry.url === url);
        if (!existingEntry) return results.push({ url, images: imgPath });

        existingEntry.images = imgPath;
      } catch (error: CustomError | any) {
        handlerError(error, ctx);
      }
    }
  );

  urls.forEach(({ href }) => cluster.queue(href));

  await cluster.idle();
  await cluster.close();

  return results;
};
