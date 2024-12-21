const express=require('express');
const { signup, login, changePassword } = require('../controllers/auth');
const {auth,isAdmin, isStudent}=require('../middlewares/auth');
const { getCourseDetails } = require('../controllers/courseCon');
const { getCategoryPageDetails,createCategory } = require('../controllers/categoryCon');
const { contactUs } = require('../controllers/contactUs');
const {createSection, updateSection, deleteSection}=require('../controllers/sectionCon');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSection');
const router=express.Router;

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/change-password",changePassword);

router.get("/course",auth,isStudent,getCourseDetails);
router.get("/category-courses",auth,isStudent,getCategoryPageDetails);
router.post('/contact-us',contactUs);

router.post("/create-course",auth,isInstructor,createCourse);
router.post("/create-section",auth,isInstructor,createSection);
router.update("/update-section",auth,isInstructor,updateSection);
router.delete("/delete-section",auth,isInstructor,deleteSection);
 
router.post("/create-subSection",auth,isInstructor,createSubSection);
router.update("/update-subSection",auth,isInstructor,updateSubSectionSubSection);
router.delete("/delete-subSection",auth,isInstructor,deleteSubSection);

router.post("/create-category",auth,isAdmin,createCategory);
exports.module=router;