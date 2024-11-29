import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyDashboard.css';

const MyDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mycourses', { withCredentials: true });
        setPurchasedCourses(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="purchased-courses">
        {purchasedCourses.length === 0 ? (
          <p className="no-courses">No courses purchased yet.</p>
        ) : (
          purchasedCourses.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.course.title}</h3> {/* Access course details */}
              <p><strong>Description:</strong> {course.course.description}</p>
              <p><strong>Price:</strong> ${course.course.price}</p>
              <p><strong>Level:</strong> {course.course.level}</p>
              <p><strong>Duration:</strong> {course.course.duration} hours</p>
              <p><strong>Purchased on:</strong> {new Date(course.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Expiry Date:</strong> {new Date(course.expiryDate).toLocaleDateString()}</p>

              {/* Display video links */}
              {Array.isArray(course.course.links) && course.course.links.length > 0 && (
                <div className="course-links">
                  <strong>Course Videos:</strong>
                  <ul>
                    {course.course.links.map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          Watch Video {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDashboard;
