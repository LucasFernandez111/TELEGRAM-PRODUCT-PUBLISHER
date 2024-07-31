import { Page } from "puppeteer";

import path from "path";
import { imagesBasePath } from "../../../config";

interface GetImagesParams {
  page: Page;
  url: string;
}

export const taskGetImages = async ({
  page,
  url,
}: GetImagesParams): Promise<string> => {
  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 3, // Aumenta la densidad de píxeles
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    await page.waitForSelector("img.autocover", {
      timeout: 30000,
      visible: true,
    });

    const elementImage = await page.$("img.autocover");

    if (!elementImage) {
      const errorMessage = `[getImages] No se encontró el elemento en ${url}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const urlParts = url.split("/");
    const baseName = (urlParts.pop() || "").split("?")[0];
    const uniqueName = `${baseName}-${Date.now()}.png`;
    const pathRelative = path.resolve(imagesBasePath, uniqueName);

    const boundingBox = await elementImage.boundingBox();

    if (!boundingBox) {
      const errorMessage = `[getImages] No se pudo obtener el bounding box del elemento en ${url}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    await page.screenshot({
      path: pathRelative,
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      },
    });

    return pathRelative;
  } catch (error) {
    console.error(`[getImages] Error procesando la URL: ${url}`, error);
    throw new Error(`[getImages] Error procesando la URL: ${url}`);
  }
};
