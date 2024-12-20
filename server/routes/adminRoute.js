const express=require('express');
const { signup, login, changePassword } = require('../controllers/auth');
const { createCategory } = require('../controllers/categoryCon');
const {auth,isAdmin}=require('../middlewares/auth');
const router=express.Router;

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/change-password",changePassword);

router.post("/create-category",auth,isAdmin,createCategory);