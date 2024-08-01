import { Context } from "telegraf";

export const handlerError = (err: Error, ctx?: Context) => {
  if (err instanceof CustomError) {
    console.warn(`[${err.functionName}] -> ${err.message}`);

    return ctx && ctx.reply(`${err.clientMessage}`);
  }
  console.error(err);
};
