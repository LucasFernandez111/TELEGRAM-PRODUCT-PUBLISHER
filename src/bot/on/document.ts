import { uploadDocument } from "../../utils/upload_document";
import { getFileUrl } from "../../utils/get_file_url";
import { Markup } from "telegraf";

export default async (ctx: any) => {
  try {
    const document = ctx.msg.document;
    const { file_id } = document;
    const { file_path } = await ctx.telegram.getFile(file_id);
    const fileUrl = getFileUrl(file_path);
    await uploadDocument(fileUrl);

    ctx.reply(
      "¿Deseas publicarlo? 📤",
      Markup.inlineKeyboard([
        Markup.button.callback("✅", "publish"),
        Markup.button.callback("❌", "cancel_publish"),
      ])
    );
  } catch (error) {
    console.log(error);
  }
  1;
};
