import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Extract details from the CLOUDINARY_URL
const cloudinaryUrl = process.env.CLOUDINARY_URL;
const matches = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/]+)$/);

if (!matches) {
    throw new Error("Invalid Cloudinary URL format");
}

const [, apiKey, apiSecret, cloudName] = matches;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

export default cloudinary;

// import {v2 as cloudinary} from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_URL,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET
// });
// export default cloudinary;