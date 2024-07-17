
import { Document } from "@telegraf/types";
import { handleResponse } from "../utils/response_handler";


export const isExcelFile = async (ctx: any, next: () => Promise<void>): Promise<void> => {
  const document : Document = ctx.msg?.document


  if (!document) return

  if (document.mime_type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return handleResponse(ctx,"middleware","error")

  handleResponse(ctx,"middleware","success")
  

  await next();
};
