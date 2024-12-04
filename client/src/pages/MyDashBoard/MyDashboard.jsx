import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyDashboard.css';
import { AuthContext } from '../../context/AuthContext';

const MyDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [error, setError] = useState(null);
  const { url } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get(`${url}/api/mycourses`, { withCredentials: true });
        setPurchasedCourses(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchPurchasedCourses();
  }, [url]);

  const navigateToVideos = (courseId) => {
    navigate(`/course-videos/${courseId}`);
  };

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="purchased-courses">
        {purchasedCourses.length === 0 ? (
          <p className="no-courses">No courses purchased yet.</p>
        ) : (
          purchasedCourses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.course.title}</h3> {/* Access course details */}
              <p><strong>Description:</strong> {course.course.description}</p>
              <p><strong>Price:</strong> ₹{course.course.price}</p>
              <p><strong>Level:</strong> {course.course.level}</p>
              <p><strong>Duration:</strong> {course.course.duration} hours</p>
              <p><strong>Purchased on:</strong> {new Date(course.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Expiry Date:</strong> {new Date(course.expiryDate).toLocaleDateString()}</p>

              {/* Navigate to the Course Videos Page */}
              <button onClick={() => navigateToVideos(course._id)} className="watch-videos-button">
                Watch Videos
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDashboard;
