const express=require('express');
const { signup, login, changePassword } = require('../controllers/auth');
const { createCourse } = require('../controllers/courseCon');
const {auth,isAdmin}=require('../middlewares/auth');
const {createSection, updateSection, deleteSection}=require('../controllers/sectionCon');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSection');
const router=express.Router;

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/change-password",changePassword);

router.post("/create-course",auth,isInstructor,createCourse);
router.post("/create-section",auth,isInstructor,createSection);
router.update("/update-section",auth,isInstructor,updateSection);
router.delete("/delete-section",auth,isInstructor,deleteSection);
 
router.post("/create-subSection",auth,isInstructor,createSubSection);
router.update("/update-subSection",auth,isInstructor,updateSubSectionSubSection);
router.delete("/delete-subSection",auth,isInstructor,deleteSubSection);