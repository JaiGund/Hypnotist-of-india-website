import Course from '../models/courseSchema.js';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

export const purchaseCourse = async (req, res) => {
  const { courseId } = req.body;  // Get the courseId from the request body

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    const user = req.user;  // Get the user from the authenticated request (set by the protect middleware)

    // Ensure the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add the course to the user's boughtCourses
    user.boughtCourses.push({ course: course._id });
    await user.save();

    res.status(200).json({ message: 'Course purchased successfully' });
  } catch (error) {
    console.error('Error during purchase:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id) // Assuming req.user._id is set via authentication middleware
      .populate('boughtCourses.course') // Populate the course details for each bought course
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the full course details in the response
    res.json(user.boughtCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

