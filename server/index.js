const cookieParser = require('cookie-parser');
const express=require('express');
const fileUpload = require('express-fileupload');
const cloudinaryConnection = require('./config/cloudinary');
const conncetToDatabase = require('./config/database');
const userRoute=require('./routes/userRoute');
const courseRoute=require('./routes/courseRoute');
const profileRoute =require('./routes/profileRoute');
const paymentRoute=require('./routes/paymentRoute');
const adminRoute=require('./routes/adminRoute');
const cors=require('cors');
const app=express();
require('dotenv').config();
const port=process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp', 
}));

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://studynotion-frontend-dun.vercel.app" 
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization"
    ]
}));

app.use('/api/v1/auth',userRoute);
app.use('/api/v1/course',courseRoute);
app.use('/api/v1/profile',profileRoute);
app.use('/api/v1/payment',paymentRoute);
app.use('/api/v1/admin',adminRoute);
const checkInternetConnection=async ()=>{
    try {
        await require('dns').promises.resolve('www.google.com');
        return true
    } catch (error) {
        return false;
    }
}

const connectToDatabaseWithRetry=async ()=>{
    const isConnected=await checkInternetConnection();
    if(isConnected){
        await conncetToDatabase();
    }else{
        console.log("No Internet Connection");
        setTimeout(connectToDatabaseWithRetry,5000);
    }
}


cloudinaryConnection();
connectToDatabaseWithRetry();
app.get('/',(req,res)=>{
     return res.status(200).json({
         success:true,
         message:"server is started"
    });
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
