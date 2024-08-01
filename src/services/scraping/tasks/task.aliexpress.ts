import { Page } from "puppeteer";
import { cookies, userAgent } from "../../../config/scrape";
import { CustomError } from "../../../utils/custom.error";

export const taskAliexpress = async (page: Page, url: string) => {
  await page.setUserAgent(userAgent);
  await page.setCookie(...cookies);
  await page.goto(url);

  const title = await page.title();

  if (["Page Not Found - Aliexpress.com", "404 page", ""].includes(title))
    throw new CustomError(
      "Enlace caido",
      "❌ Enlace caido: " + url,
      "taskAliexpress"
    );

  const price = await page.evaluate(() => {
    return document.querySelector(".product-price")?.textContent;
  });

  if (!price) return "";

  return price.trim();
};
