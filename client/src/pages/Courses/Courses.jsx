import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Courses.css';
import { AuthContext } from '../../context/AuthContext';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { url } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/api/courses`);
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [url]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <div className="courses-hero-content">
          <h1>Find Peace Within with Our Courses</h1>
          <p>We offer a variety of guided meditations to help reduce stress and anxiety, improve focus and concentration and boost your overall well-being.</p>
        </div>
      </div>
      
      <div className="courses-container">
        <h2>Programs</h2>
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card" onClick={() => navigate(`/courses/${course._id}`)}>
              <div className="course-image-container">
                <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <div className="course-divider"></div>
                <p>{course.description}</p>
                <div className="course-price-container">
                  {course.price > 0 ? (
                    <span className="course-price">₹{course.price}</span>
                  ) : (
                    <span className="course-free">Free</span>
                  )}
                </div>
                <button className="join-button">Join</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;