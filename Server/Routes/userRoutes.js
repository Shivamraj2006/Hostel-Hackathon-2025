import express from"express";
import { checkStudentName, registerUser, logoutUser } from '../Controllers/authController.js';


const router=express.Router();

router.post("/register", registerUser);

router.post("/login", checkStudentName);

router.post('/logout', logoutUser);


export default router;