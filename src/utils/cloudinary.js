import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

 // Upload an image
 const uploadCloudinary = async(localFilePath) => {
    try {
        if(!localFile) return null;
        const response = await cloudinary.uploader
       .upload(
           localFilePath, {
               resource_type:"auto"
           }
       )
       console.log("File uploaded succesfully",response.url);
       return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temperary file as the upload operation faliled
        return null;
    }
 }
 export default uploadCloudinary;
