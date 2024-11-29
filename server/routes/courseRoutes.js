// routes/courseRoutes.js
import express from 'express';
import { addCourse, getAllCourses } from '../controllers/courseController.js';
import Course from '../models/courseSchema.js';

const router = express.Router();

router.post('/add', addCourse); // Route to add a new course
router.get('/', getAllCourses);  // Route to get all courses
router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;
