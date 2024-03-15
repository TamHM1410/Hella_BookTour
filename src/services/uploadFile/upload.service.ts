
import { cloudinary } from "../../config/cloudinary/cloudinary.config"
import stream from 'stream';


export const updateImageFromUrl = async ()=>{
    try{
   
        
        const rs= await cloudinary.api.delete_folder('hcm')
        console.log('hihi',rs)
        return  rs

    }catch(error){
        console.log(error)
    }
}
export const deleteFolder=async (folderName:string)=>{
    try{
        const folderInfo = await cloudinary.api.resource(folderName).catch((error)=>{
            console.log(error)
        })
    ;
      
      
        if (folderInfo) {
           
            await cloudinary.api.delete_resources_by_prefix(folderName).then(()=> cloudinary.api.delete_folder(folderName)).catch((error)=>{
                console.log(error)
            })
        
        } else {
            console.log(`Folder '${folderName}' does not exist. Skipping deletion.`);
        }

    }catch(error){
        console.error('Error uploading files to Cloudinary:', error);
        throw error;
        
    }
}
export const getAllimage =async (folderName :string)=>{
    try{ 
        
        const result = await cloudinary.search.expression(`folder:${folderName}`).execute()
     
        if(result.resources){
            const arr =result.resources 
         
            const  data = arr.map((item:any)=>item.url)
            return {
                status:200,
                statusCode:200,
                data:data,
             
              
            }
        }
        

    }catch(error){
        console.error('Error uploading files to Cloudinary:', error);
        throw error;
    }
}
export const upLoadFiles = async (files: any[],folderName:string) => {
    try {
        if (!files.length) return []; 

        const uploadUrls: any[] = [];
        for (const file of files) {
            const bufferStream = stream.Readable.from([file.buffer]);

            await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: folderName }, 
                    (error: any, result: any) => {
                        if (error) {
                            console.error('Error uploading file to Cloudinary:', error);
                            reject(error);
                        } else {
                            uploadUrls.push({
                                image_url: result.secure_url,
                                thumb_url: cloudinary.url(result.public_id, {
                                    height: 500,
                                    width: 500,
                                    crop: 'thumb',
                                    format: 'jpg'
                                })
                            });
                            resolve(result);
                        }
                    }
                );
                bufferStream.pipe(uploadStream);
            });
        }

        return uploadUrls;
    } catch (error) {
        console.error('Error uploading files to Cloudinary:', error);
        throw error;
    }
};