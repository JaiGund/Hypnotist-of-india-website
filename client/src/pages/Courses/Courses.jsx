import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Courses.css'

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="courses-page">
      {courses.map((course) => (
        <div key={course._id} className="course-card" onClick={() => navigate(`/courses/${course._id}`)}>
          <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Price: ${course.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
