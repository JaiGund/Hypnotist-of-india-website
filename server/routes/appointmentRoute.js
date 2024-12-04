import express from 'express';
import { createAppointment, getAllAppointments, markAsRead } from '../controllers/appointmentController.js';

const router = express.Router();

// Route to book a new appointment
router.post('/appointments', createAppointment);

// Route to get all appointments (optional: for admin use)
router.get('/appointments', getAllAppointments);
router.patch('/:id/read', markAsRead); // Mark as read

export default router;
