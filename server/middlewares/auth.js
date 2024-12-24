const jwt=require('jsonwebtoken');
require('dotenv').config();
exports.auth=async (req,res,next)=>{
    try {
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("bearer ","");
        if(!token){
             return res.status(401).json({
                 success:false, 
                 message:"missing authentication token"
            });
        }
        //token check
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log("decoded token",decode);
            req.user=decode;
        } catch (error) {
            console.log("invalid token",error);
            return res.status(400).json({
                success:false,
                message:"invalid token,authentication failed"
           });
        }
        next();     
    } catch (error) {
        console.log('authentication error', error);
        return res.status(500).json({
            success: false,
            message: 'failure in authnetication'
        });
    }
}

exports.isStudent=async (req,res,next)=>{
    try {
        if(req.token.role!=="Student"){
            return res.status(403).json({
                success:false,
                message:"user is not authrized for student route"
            })
        }
        next();
    } catch (error) {
        console.log('issue in Student authentication', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while authenticating student route'
        });
    }
}

exports.isInstructor=async (req,res,next)=>{
    try {
        if(req.token.role!=="Instructor"){
            return res.status(403).json({
                success:false,
                message:"user is not authrized for Instructor route"
            })
        }
        next();
    } catch (error) {
        console.log('issue in Instructor authentication', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while authenticating Instructor route'
        });
    }
}

exports.isAdmin=async (req,res,next)=>{
    try {
        if(req.token.role!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"user is not authrized for Admin route"
            })
        }
        next();
    } catch (error) {
        console.log('issue in Admin authentication', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while authenticating Admin route'
        });
    }
}