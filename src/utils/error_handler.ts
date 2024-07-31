import { Context } from "telegraf";

export const handlerError = (err: Error, ctx?: Context) => {
  console.warn(err.message);

  if (ctx) {
    ctx.reply("Lo siento... hubo un problema al publicar el documento 😢");
    ctx.reply("Sube el archivo nuevamente");
    ctx.reply(`Descripcion: ${err.message}`);
  }
};
