
import { BOT_TOKEN } from '../config';

export const getFileUrl =  (filePath:string ):string => `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`

