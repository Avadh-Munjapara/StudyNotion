const nodeMailer=require('nodemailer');
require('dotenv').config();
const mailSender=async (email,title,body)=>{
    try{
        // const transporter=nodeMailer.createTransport({
        //     service: "Outlook365",
        //     host: process.env.HOST,
        //     port: "587",
        //     tls: {
        //         ciphers: "SSLv3",
        //         rejectUnauthorized: false,
        //     },
        //     auth: {
        //         user: process.env.USEREMAIL,
        //         pass: process.env.USERPASS
        //     }
        const transporter=nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.USEREMAIL,
                pass:process.env.USERPASS
            }
        });
        const mailInfo=transporter.sendMail({
            from:"StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })    
        console.log(mailInfo);
        return mailInfo;
    }
    catch(error){
        console.log('error while sending mail',error);
    }
       
}

module.exports=mailSender;