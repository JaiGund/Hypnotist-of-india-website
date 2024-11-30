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

  const disableRightClick = (e) => {
    e.preventDefault(); // Disable right-click on the video
  };

  const handleBuyCourse = () => {
    // Add purchase logic here (such as making an API call)
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

      <div className="video-section">
        <h2>Course Videos</h2>
        <ul className="video-list">
          {course.links.map((link, index) => (
            <li key={index} className="video-item">
              <div className="video-container" onContextMenu={disableRightClick}>
                <div className="overlay"></div>
                <iframe
        title="YouTube Video"
        src={`https://www.youtube.com/embed/kqHax3cp0rY?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // Disable user interactions
        }}
      />

              </div>
              <p>Video {index + 1}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="button-container">
        <button className="buy-button" onClick={handleBuyCourse}>Buy Course</button>
      </div>
    </div>
  );
};

export default CourseDetails;
