// controllers/courseController.js
import Course from '../models/courseSchema.js';

export const addCourse = async (req, res) => {
  try {
    const { title, description, price, category, duration, level, studentsEnrolled, thumbnail, links } = req.body;

    const newCourse = new Course({
      title,
      description,
      price,
      category,
      duration,
      level,
      studentsEnrolled,
      thumbnail,
      links,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(400).json({ message: 'Error adding course', error: error.message });
  }
};

// controllers/courseController.js
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();  // Assuming you're using Mongoose to fetch data
    res.json(courses);  // Send an array of courses as the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

