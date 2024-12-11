const nodeMailer=require('nodemailer');
require('dotenv').config();
const mailSender=async (email,title,body)=>{
    try{
        const transporter=nodemailer.createTransporter({
            host:process.env.HOST,
            auth:{
                user:process.env.USEREMAIL,
                pass:process.env.USERPASS
            }
        });
        const mailInfo=await transporter.sendMail({
            from:"StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            body:`${body}`,
        })    
        console.log(mailInfo);
        return mailInfo;
    }
    catch(error){
        console.log('error while sending mail',error);
    }
       
}

module.exports=mailSender;