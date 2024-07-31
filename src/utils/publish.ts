import { clusterAliexpress } from "../services/scraping/clusters/cluster.aliexpress";
import { clusterYupoo } from "../services/scraping/clusters/cluster.yupoo";
import { clusterImages } from "../services/scraping/clusters/clusters.images";
import { Context } from "telegraf";
import { DataSheet } from "../interfaces/excel.interfaces";
import { combineData } from "../utils/format";
import { sendPost } from "./send.post";

export const publish = async (dataSheet: DataSheet, ctx?: Context) => {
  try {
    //Obtencion precios de aliexpress
    const messageProgress = await ctx?.reply(
      "🔄 Obteniendo datos Aliexpress..."
    );
    const prices = await clusterAliexpress(dataSheet.urls);
    const pricesAndCodes = prices.map((price, index) => ({
      price,
      code: dataSheet.codes[index],
      url: dataSheet.urls[index],
    }));

    await ctx?.telegram.editMessageText(
      messageProgress?.chat.id,
      messageProgress?.message_id,
      "",
      ` Obteniendo códigos de Yupoo 🔍📲
`
    );

    //Obtencion urls de imagenes
    const imagesUrls = await clusterYupoo(dataSheet.yupoo, dataSheet.codes);

    //Upload images
    const imagesPath = await clusterImages(imagesUrls);

    await ctx?.telegram.editMessageText(
      messageProgress?.chat.id,
      messageProgress?.message_id,
      "",
      `Reopilando imagenes de Yupoo 📸...`
    );

    const combinedData = combineData(pricesAndCodes, imagesUrls, imagesPath);

    await ctx?.telegram.editMessageText(
      messageProgress?.chat.id,
      messageProgress?.message_id,
      "",
      `✅📋 Publicando ${pricesAndCodes.length} productos.`
    );
    for (const data of combinedData) {
      if (data) {
        await sendPost(data.price, data.url, data.href, data.images);
      }
    }
    await ctx?.telegram.editMessageText(
      messageProgress?.chat.id,
      messageProgress?.message_id,
      "",
      "Publicación completada 🛍️✨"
    );
  } catch (error: any) {
    console.error("Error en el proceso de publicación:", error);
    if (ctx) {
      await ctx.reply(`Error en el proceso de publicación: ${error.message}`);
    }
  }
};
