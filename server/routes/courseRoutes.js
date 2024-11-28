// routes/courseRoutes.js
import express from 'express';
import { addCourse, getAllCourses } from '../controllers/courseController.js';

const router = express.Router();

router.post('/add', addCourse); // Route to add a new course
router.get('/', getAllCourses);  // Route to get all courses

export default router;
