const { createCategory, getAllCategory, getCategoryPageDetails } = require('../controllers/categoryCon');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSection');
const { auth, isInstructor, isAdmin, isStudent } = require('../middlewares/auth');
const  express  = require('express');
const router=express.Router();
const { createSection, updateSection, deleteSection } = require('../controllers/sectionCon');
const { createRating, getAverageRating, getAllReviews, getCourseReviews } = require('../controllers/ratingAndReview');
const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/courseCon');

//routes for courses 
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/createSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.get("/courseDetails",getCourseDetails);
router.get("/allCourse",getAllCourses);

//routes for category
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/categoryCourses",getCategoryPageDetails);
router.get("/allCategory",getAllCategory);

//routes for rating and review
router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllReviews',getAllReviews);
router.get('/getCourseReview',getCourseReviews);

module.exports=router;