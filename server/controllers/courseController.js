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

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};