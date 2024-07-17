
import { uploadDocument } from '../../utils/upload_document';
import { getFileUrl } from '../../utils/get_file_url';
// import { handleResponse } from '../../utils/response_handler';
// import { Context } from 'telegraf';





export default async  (ctx:any) => {
    
try{
    const document = ctx.msg.document
    const {file_id} = document
    const { file_path } = await ctx.telegram.getFile(file_id);

    const fileUrl  = getFileUrl(file_path)


 



   await  uploadDocument(fileUrl)

    


}catch(error){
 console.log(error);
 

}

}