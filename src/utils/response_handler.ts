import { Context, Markup} from "telegraf";
import { verifyLanguage } from "./lenguage";
import { locales } from "../locales/locales";

import { Buttons } from "../interfaces/buttons.interface";





type MessageEvent = "middleware" 
type MessageType = "error" | "success"


export const handleResponse = (ctx:Context,message:MessageEvent,type:MessageType,buttons?: Buttons[][] ) : void => {
const language = verifyLanguage(ctx);
const response = locales[language]?.[message]?.[type] || "Unknown message type";



if(buttons){
    ctx.reply(response, {reply_markup: {inline_keyboard: buttons}});
}else {
    ctx.reply(response);

}
}