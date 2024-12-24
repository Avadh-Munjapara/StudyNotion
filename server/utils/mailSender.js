const nodeMailer=require('nodemailer');
require('dotenv').config();
const mailSender=async (email,title,body)=>{
    console.log("otp in mailesender",body);
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
            text:`one time password for studynotion signup is ${body}`,
        })    
        console.log(mailInfo);
        return mailInfo;
    }
    catch(error){
        console.log('error while sending mail',error);
    }
       
}

module.exports=mailSender;