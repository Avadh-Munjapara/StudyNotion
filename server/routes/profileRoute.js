const { getUserDetails, updateProfile, deleteAccount, updateDisplayPicture, getEnrolledCourses } = require('../controllers/profileCon');
const { auth } = require('../middlewares/auth');
    
const  express  = require('express');
const router=express.Router();
router.get('/getUserDetails',auth,getUserDetails);
router.put('/updateProfile',auth,updateProfile);
router.delete('/deleteAccount',auth,deleteAccount);
router.put('/updateDP',auth,updateDisplayPicture);
router.get('/getEnrolledCourses',auth,getEnrolledCourses);

module.exports=router;