import axios from "axios"
import { Stream } from "stream"
import fs from "fs"
import path from "path"

type OutPutPath = string


export const uploadDocument = async  (url:string):Promise<OutPutPath> => {
   
   const response  = await  axios.get<Stream>(url, {responseType: 'stream'})
   
   if(!response) throw new Error("getDocument : Document not found")

  
   const outPutPath : OutPutPath = path.join(__dirname,'..','..','uploads','documents',`${Date.now()}.xlsx`)

   
    fs.createWriteStream(outPutPath).write(response.data)



   return outPutPath


  

}