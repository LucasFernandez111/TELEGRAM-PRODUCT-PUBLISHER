import { Page } from "puppeteer";
import { CustomError } from "../../../utils/custom.error";

interface CodeResult {
  titleCode: string;
  href: string;
}

export const taskYupoo = async (
  page: Page,
  url: string,
  codes: string[]
): Promise<CodeResult[]> => {
  try {
    await page.goto(`${url}search/album?uid=1&sort=&q=${codes.join(",")}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector(".album__title", {
      timeout: 30000,
      visible: true,
    });

    await page.waitForSelector("a.album__main", {
      timeout: 30000,
      visible: true,
    });

    const results: CodeResult[] = [];
    for (const code of codes) {
      try {
        const element = await page.$(`a[title="${code}"]`);
        if (!element) {
          console.warn(`No se encontró el elemento para el código: ${code}`);
          continue;
        }

        const href = await page.evaluate(
          (el: HTMLElement) => el.getAttribute("href"),
          element
        );
        const titleCode = await page.evaluate(
          (el: HTMLElement) => el.getAttribute("title"),
          element
        );

        if (!href || !titleCode) {
          console.warn(
            `Elemento encontrado pero sin href o title para el código: ${code}`
          );
          continue;
        }

        results.push({ titleCode, href: new URL(href, url).toString() });
      } catch (error) {
        console.error(
          `Error procesando el código: ${code} en la URL: ${url}`,
          error
        );
      }
    }

    return results;
  } catch (err) {
    throw new CustomError(
      `No se encontro las publicaciónes para la URL: ${url} y códigos: ${codes.join(
        " - "
      )}`,
      `No se encontro las publicaciónes para la URL: ${url} y códigos: ${codes.join(
        " - "
      )}`,
      "taskYupoo"
    );
  }
};
