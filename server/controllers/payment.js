const User = require('../models/User');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');
const instance=require("../config/razorPay");
const mailSender=require('../utils/mailSender');
exports.capturePayment=async (req,res)=>{
    //fetch needed data
    const {courseId}=req.body;
    const userId=req.user.id;
    if(!courseId||!userId){
         return res.status(400).json({
             success:false,
             message:"courseid and userid is required"
        });
    };
    let user;
    let course;
    try {
         user=await User.findById(userId);
         course=await Course.findById(courseId);
        if(!course){
             return res.status(400).json({
                 success:false,
                 message:"no such course found"
            });
        }
        if(!user){
             return res.status(400).json({
                 success:false,
                 message:"no user found"
            });
        };
        const uid=mongoose.Schema.Types.ObjectId(userId);
        if(Course.studentsEnrolled.includes(uid)){
             return res.status(400).json({
                 success:false,
                 message:"student has already purchased the course"
            });
        }
    } catch (error) {
        console.log('error while fetching data', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    //check for user and is student alreay purchased course
  
    //create order, intitate razorpay payment
    const options={
        amount:course.price*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
        notes:{
            userId,
            courseId
        }
    }
    try {
        const paymentResponse=await instance.create(options,(err,order)=>{
            console.log(order);
        });
    
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    } catch (error) {
        console.log('eror while initiating payment', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//verify signature of razorpay and server

exports.verifySignature=async (req,res)=>{
    
    const webHookSecret=process.env.WEBHOOKSECRET;
    const razorpaySignature=req.headers['x-razorpay-signature'];
    const shaSum=crypto.createHmac("sha256",webHookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest=shaSum.digest("hex");

    if(razorpaySignature===digest){
    console.log("payment is authorized");
    //fullfill the action
    try {
        const{userId,courseId}=req.body.payload.payment.entity.notes;
        const enrolledCourse=await Course.findyByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true});
        const enrolledStudent=await User.findyByIdAndUpdate(userId,{$push:{courses:courseId}},{new:true});
    
    } catch (error) {
        console.log('error while updating database', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
  
    const enrollEmail=await mailSender(enrolledStudent.email,"enrollment successfull","let's begin new journey");
     return res.status(200).json({
         success:true,
         message:"verification successfull and course added"
    });
}
else{
     return res.status(400).json({
         success:false,
         message:"invalid request"
    });
}
}