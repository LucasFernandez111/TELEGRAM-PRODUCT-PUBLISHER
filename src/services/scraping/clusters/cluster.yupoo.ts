import { Context } from "telegraf";
import { Cluster } from "puppeteer-cluster";
import { taskYupoo } from "../tasks/taks.yupoo";

interface TaskData {
  url: string;
  codes: string[];
}

interface CodeResult {
  titleCode: string;
  href: string;
}

export const clusterYupoo = async (
  url: string,
  codes: string[],
  ctx?: Context
): Promise<CodeResult[]> => {
  const linksImages: CodeResult[] = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    puppeteerOptions: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-zygote"],
    },
  });

  await cluster.task(
    async ({ page, data: { url, codes } }: { page: any; data: TaskData }) => {
      try {
        const links = await taskYupoo(page, url, codes);
        linksImages.push(...links); // Asegúrate de concatenar los enlaces correctamente.
      } catch (error: Error | any) {
        console.error(`Error processing URL: ${url}`, error);
        if (ctx) {
          await ctx.reply(error?.message);
        }
      }
    }
  );

  cluster.queue({ url, codes });

  await cluster.idle();
  await cluster.close();

  return linksImages;
};
