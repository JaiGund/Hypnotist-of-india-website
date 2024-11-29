// routes/purchaseRoutes.js
import express from 'express';
import { purchaseCourse, getPurchasedCourses } from '../controllers/purchaseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for purchasing a course
router.post('/purchase', protect, purchaseCourse);

// Route for fetching purchased courses (My Dashboard)
router.get('/mycourses', protect, getPurchasedCourses);

export default router;
