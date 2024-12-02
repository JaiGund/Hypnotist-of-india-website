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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="courses-page">
      <h1>Our Courses</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card" onClick={() => navigate(`/courses/${course._id}`)}>
            <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
            <div className="course-info">
              <span className="course-category">#Business Coaching</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-footer">
                <span className="course-price">₹{course.price}</span>
                <button className="join-button">Join Our Class</button>
              </div>
              <div className="course-rating">
                <span>⭐ 4.8</span>
                <span>(134 Reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
