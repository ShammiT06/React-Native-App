import {v2 as cloudinary} from "cloudinary"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_API_SEC

})


export default cloudinary