const express=require('express');
const { signup, login, changePassword } = require('../controllers/auth');
const {auth,isAdmin, isStudent}=require('../middlewares/auth');
const { getCourseDetails } = require('../controllers/courseCon');
const { getCategoryPageDetails } = require('../controllers/categoryCon');
const { contactUs } = require('../controllers/contactUs');
const router=express.Router;

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/change-password",changePassword);
router.post("/change-password",changePassword);

router.get("/course",auth,isStudent,getCourseDetails);
router.get("/category-courses",auth,isStudent,getCategoryPageDetails);
router.post('/contact-us',contactUs);

exports.module=router;