import express from"express";
import { checkStudentName, registerUser, logoutUser } from '../Controllers/authController.js';


const router=express.Router();

// student routes
router.post("/register", registerUser);
router.post("/login", checkStudentName);
router.post('/logout', logoutUser);

//supervisor routes


export default router;