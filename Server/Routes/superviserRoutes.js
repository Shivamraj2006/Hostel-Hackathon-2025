import express from 'express';
import { loginSuperVisor,logoutSuperVisor} from '../Controllers/authController.js'
const router=express.Router();

// Login route
router.post("/login",loginSuperVisor);
// Logout route
router.post('/logout',logoutSuperVisor);

export default router;