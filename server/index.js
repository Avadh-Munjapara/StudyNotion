const cookieParser = require('cookie-parser');
const express=require('express');
const fileUpload = require('express-fileupload');
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser);
app.use(fileUpload);

await cloudi