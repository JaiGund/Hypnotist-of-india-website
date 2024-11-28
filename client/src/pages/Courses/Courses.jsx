import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Courses.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);  // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);     // For handling errors

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        if (Array.isArray(response.data)) {
          setCourses(response.data); // Set the courses from response.data.data
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

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error message
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
                  src={course.links[0]} // Shows the first video link as a thumbnail preview
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CoursesPage;
