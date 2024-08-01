import { Context } from "telegraf";
import { Cluster } from "puppeteer-cluster";
import { taskYupoo } from "../tasks/taks.yupoo";
import { CustomError } from "../../../utils/custom.error";
import { handlerError } from "../../../utils/error_handler";

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
      } catch (error: CustomError | any) {
        handlerError(error, ctx);
      }
    }
  );

  cluster.queue({ url, codes });

  await cluster.idle();
  await cluster.close();

  return linksImages;
};
