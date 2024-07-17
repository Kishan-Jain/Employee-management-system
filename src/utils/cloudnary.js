import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import {ApiError} from "./apiError.js"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET
    });

    
async function uploadToCloudnary(commanFilePath) {
  
    // Upload an image
    try {
        if (!commanFilePath) return null
        const response = await cloudinary.uploader
           .upload( commanFilePath,
                {
                    resource_type: "auto"
                }
            )
          
        if(!response){
            return new ApiError(500, "clounary upload Faild")
        }
            
        fs.unlinkSync(localFilePath)
        // console.log(uploadResult);
        return response;
    } catch (error) {
        return new ApiError(500, "something went to wrong")
    }      
}

