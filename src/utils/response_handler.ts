import { Context} from "vm";
import { verifyLanguage } from "./lenguage";
import { locales } from "../locales/locales";
import { Markup } from "telegraf";


type messageEvent = "middleware" 
type messageType = "error" | "success"

export const handleResponse = (ctx:Context,message:messageEvent,type:messageType,buttons?:Array<[string]> ) => {
const language = verifyLanguage(ctx);
const response = locales[language]?.[message]?.[type] || "Unknown message type";

if(buttons) return ctx.reply(response,Markup.keyboard(buttons).resize().oneTime());
return ctx.reply(response);
}