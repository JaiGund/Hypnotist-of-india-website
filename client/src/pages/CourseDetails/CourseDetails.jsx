import React, { useContext, useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css';
import { AuthContext } from '../../context/AuthContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const {url} = useContext(AuthContext);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleBuyCourse = () => {
    // Add purchase logic here (e.g., making an API call to buy the course)
    alert('Course Purchased');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-container">
      <img
        src={course.thumbnail || 'https://via.placeholder.com/800x400?text=No+Thumbnail'}
        alt={course.title}
        className="course-thumbnail"
      />
      <h1 className="course-title">{course.title}</h1>
      <p className="course-price">Price: ${course.price}</p>
      <p className="course-description">{course.description}</p>
      <div className="course-meta">
        <span>Level: {course.level}</span>
        <span>Duration: {course.duration} hours</span>
      </div>

      <div className="button-container">
        <button className="buy-button" onClick={handleBuyCourse}>Buy Course</button>
      </div>
    </div>
  );
};

export default CourseDetails;
