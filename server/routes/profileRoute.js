const { changePassword } = require('../controllers/auth');
const { getInstructorCourses } = require('../controllers/courseCon');
const { getUserDetails, updateProfile, deleteAccount, updateDisplayPicture, getEnrolledCourses } = require('../controllers/profileCon');
const { auth, isInstructor, isStudent } = require('../middlewares/auth');
    
const  express  = require('express');
const router=express.Router();
router.get('/getUserDetails',auth,getUserDetails);
router.put('/updateProfile',auth,updateProfile);
router.delete('/deleteAccount',auth,deleteAccount);
router.put('/updateDP',auth,updateDisplayPicture);
router.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.post('/changePassword',auth,changePassword);

module.exports=router;  