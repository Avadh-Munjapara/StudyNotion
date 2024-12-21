const express=require('express');
const { signup, login, changePassword, sendOTP } = require('../controllers/auth');
const {auth}=require('../middlewares/auth');
const { contactUs } = require('../controllers/contactUs');
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword');
const router=express.Router();  
router.post("/signUp",signup);
router.post("/login",login);
router.post("/changePassword",auth,changePassword);
router.post('/sendOTP',auth,sendOTP);
router.post('/contactUs',auth,contactUs);
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);

module.exports=router;