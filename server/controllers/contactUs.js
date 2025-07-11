const mailSender=require('../utils/mailSender');
const {contactUsEmail}=require("../mail/templates/contactFormRes");
require('dotenv').config();
exports.contactUs=async(req,res)=>{
    const{firstName,lastName,email,phoneNumber,message}=req.body;
    if(!firstName||!lastName||!email||!phoneNumber||!message){
         return res.status(400).json({
             success:false,
             message:"all fields are required"
        });
    }

    try {
        const contactAdmin=mailSender(process.env.USEREMAIL,"we have been contaced",
           contactUsEmail(email, firstName, lastName, message, phoneNumber));
    } catch (error) {
        console.log('error while sending mail to admin', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    

    try {
        const contactUser=mailSender(email,"You have reached us",
            `you respectfully ${firstName} and ${lastName} have reached us,we are grateful 
            for your interest in our company,we will get back to you as soon as possible`);
    } catch (error) {
        console.log('error while sending mail to the user', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    return res.json({
        success:true,
        message:"message sent successfully!"
    })
    
}