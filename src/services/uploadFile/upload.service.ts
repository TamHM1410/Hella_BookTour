import { cloudinary } from "../../config/cloudinary/cloudinary.config"
import stream from 'stream';


export const updateImageFromUrl = async ()=>{
    try{
        const url ='https://media.vneconomy.vn/w800/images/upload/2023/06/29/sai-gon-ve-dem.jpg'
        const folderName='hcm'
        const result =await cloudinary.uploader.upload(url,{
            folder:folderName
        })
        console.log(result,'hihi')
        return result

    }catch(error){
        console.log(error)
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
                data:data
              
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
                                    height: 200,
                                    width: 200,
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