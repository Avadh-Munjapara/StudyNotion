const cloudinary=require('cloudinary').v2;

const cloudinaryConnection=async ()=>{
    try {
        const cloudi=cloudinary.config({
            cloud_name:process.env.CLOUDNAME,
            api_key:process.env.APIKEY,
            api_secret:process.env.APISECRET
        })
    } catch (error) {
        console.log('error while connecting to cloudinary', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}