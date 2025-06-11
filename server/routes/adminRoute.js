const { Router } = require("express");
const { stats, topInstructors, mostSellingCourses, categoryWiseStudents } = require("../controllers/adminCon");
const { auth, isAdmin } = require("../middlewares/auth");
const { createCategory } = require("../controllers/categoryCon");
const router=Router();

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/Stats",auth,isAdmin,stats);
router.get("/topInstructors",auth,isAdmin,topInstructors);
router.get("/mostSellingCourses",auth,isAdmin,mostSellingCourses);
router.get("/categorywiseStudents",auth,isAdmin,categoryWiseStudents);
module.exports=router;