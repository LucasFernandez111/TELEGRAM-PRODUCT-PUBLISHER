import { generatedPath, imagesBasePath, receivedPath } from "../../config";
import {
  readExcelFile,
  searchExcelFile,
} from "../../services/excel/read.excel.file";
import path from "path";
import { Context } from "telegraf";
import { readDataExcel } from "../../services/excel/read.data.excel";
import { isDataComplete } from "../../services/excel/excel.data.validators";
import { createExcel } from "../../services/excel/create.excel";
import { removeFiles } from "../../utils/remove.files";
import { publish } from "../../utils/publish";
import {
  getFirstFiveElements,
  getRemainingElements,
} from "../../services/excel/data.excel";
import { handlerError } from "../../utils/error_handler";

export default async (ctx: Context) => {
  try {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    //Recibir nuevo Excel
    const fileName = searchExcelFile(receivedPath);
    const documentPath = path.join(receivedPath, fileName);
    const workbook = await readExcelFile(documentPath);
    const dataSheetComplete = readDataExcel(workbook);

    // if (!isDataComplete(dataSheetComplete))
    //   throw new Error("Datos incompletos");

    //Crear nuevo Excel
    const dataSheetPublish = getFirstFiveElements(dataSheetComplete);
    const dataSheetNew = getRemainingElements(dataSheetComplete);
    const newDocument = await createExcel(dataSheetNew);

    //Envio Nuevo Excel
    ctx.reply("¡Tu nuevo excel esta listo! ✅📊");
    await ctx.replyWithDocument({ source: newDocument });

    //Realizar publicacion
    await publish(dataSheetPublish, ctx);
  } catch (error: Error | any) {
    handlerError(error, ctx);
  } finally {
    await removeFiles(receivedPath);
    await removeFiles(generatedPath);
    await removeFiles(imagesBasePath);
  }
};
