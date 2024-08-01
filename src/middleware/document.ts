import { handleResponse } from "../utils/response_handler";

export const isExcelFile = async (
  ctx: any,
  next: () => Promise<void>
): Promise<void> => {
  const document = ctx.msg?.document;

  if (!document) return;

  if (
    document.mime_type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return ctx.reply(
      "❌ Documento no válido: El archivo debe ser un Excel (.xlsx o .xls). Por favor, intenta de nuevo. ¡Gracias! 📄"
    );

  await next();
};
