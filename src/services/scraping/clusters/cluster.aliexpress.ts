import { Cluster } from "puppeteer-cluster";

import { Context } from "telegraf";
import { taskAliexpress } from "../tasks/task.aliexpress";
import { CustomError } from "../../../utils/custom.error";
import { handlerError } from "../../../utils/error_handler";

export const clusterAliexpress = async (
  urls: string[],
  ctx?: Context
): Promise<string[]> => {
  const prices: string[] = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    puppeteerOptions: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-zygote"],
    },
  });

  cluster.task(async ({ page, data: url }: any) => {
    try {
      const price = await taskAliexpress(page, url);
      prices.push(price);
    } catch (error: CustomError | any) {
      handlerError(error, ctx);
    }
  });

  for (const url of urls) {
    await cluster.queue(url);
  }

  await cluster.idle();
  await cluster.close();

  return prices;
};
