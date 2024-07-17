import { Context } from "vm";


export const verifyLanguage = (ctx: Context): 'en' | 'es' => {
    const language = ctx.from?.language_code;
    return language === 'en' ? 'en' : 'es';
  }