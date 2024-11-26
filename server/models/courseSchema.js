import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      ''
    ],
  },
  duration: {
    type: Number, // Duration in hours
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String, // URL to the course thumbnail image
    required: true,
  },
  link:{
    type:String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
