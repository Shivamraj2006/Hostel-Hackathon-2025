import express from 'express';
import { getComplaints, getActiveComplaints, createComplaint, deleteComplaint, editComplaint, updateStatus, viewActiveComplaint, viewComplaint } from '../Controllers/complaintsController.js';

const router = express.Router();

// student routes
router.get('/all/:id', getComplaints); 
router.get('/active/:id', getActiveComplaints);
router.post('/create', createComplaint);  
router.delete('/delete/:id', deleteComplaint);
router.put('/edit/:id', editComplaint);
router.patch('/update/:id', updateStatus);

// admin routes
router.get('/supervisor/all/:category', viewComplaint );
router.get('/supervisor/active/:category', viewActiveComplaint);

export default router;