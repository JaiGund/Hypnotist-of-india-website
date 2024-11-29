import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Courses.css';

// Inside CoursesPage component
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          throw new Error("Expected response to be an array");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePurchase = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/purchase',
        { courseId },
        { withCredentials: true }  // Ensure cookies are included with the request
      );
      console.log(response.data.message);
      // Handle success (e.g., display success message)
    } catch (err) {
      console.error('Error during purchase:', err);
      // Handle error (e.g., display error message)
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="courses-container">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course._id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p className="course-price">Price: ${course.price}</p>
            <p>Level: {course.level}</p>
            <p>Duration: {course.duration} hours</p>
            <div className="course-links">
              <strong>Course Videos:</strong>
              <ul>
                {course.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Watch Video {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {course.links.length > 0 && (
              <div className="video-thumbnail">
                <iframe
                  src={course.links[0]}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              </div>
            )}
            {/* Add the purchase button and pass the course._id to handlePurchase */}
            <button onClick={()=>handlePurchase(course._id)}>Buy Course</button>
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CoursesPage;

