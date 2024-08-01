import { Page } from "puppeteer";

import path from "path";
import { imagesBasePath } from "../../../config";
import { CustomError } from "../../../utils/custom.error";

interface GetImagesParams {
  page: Page;
  url: string;
}

export const taskGetImages = async ({
  page,
  url,
}: GetImagesParams): Promise<string> => {
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

  if (!elementImage)
    throw new CustomError(
      `No se encontró el elemento (img.autocover) en ${url}`,
      "⚠️ Hubo un problema al capturar la imagen. Por favor, intenta de nuevo. 📷",
      "taskGetImages"
    );

  const urlParts = url.split("/");
  const baseName = (urlParts.pop() || "").split("?")[0];
  const uniqueName = `${baseName}-${Date.now()}.png`;
  const pathRelative = path.resolve(imagesBasePath, uniqueName);

  const boundingBox = await elementImage.boundingBox();

  if (!boundingBox)
    throw new CustomError(
      `No se pudo obtener el bounding box del elemento en ${url}`,
      "⚠️ Hubo un problema al capturar la imagen. Por favor, intenta de nuevo. 📷",
      "taskGetImages"
    );

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
};
