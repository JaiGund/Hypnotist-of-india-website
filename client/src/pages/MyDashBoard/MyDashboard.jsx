import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import './MyDashboard.css';
import { AuthContext } from '../../context/AuthContext';

const MyDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isYTReady, setIsYTReady] = useState(false); // Track if YouTube API is ready
  const playerRefs = useRef({}); // Store player refs as an object indexed by course ID and video index
  const { url } = useContext(AuthContext);

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

    // Load YouTube IFrame API
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // Set up YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      setIsYTReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  const disableRightClick = (e) => {
    e.preventDefault(); // Disable right-click on the video
  };

  const initializePlayer = (courseId, videoIndex, videoId) => {
    if (isYTReady && !playerRefs.current[`${courseId}-${videoIndex}`]) {
      playerRefs.current[`${courseId}-${videoIndex}`] = new window.YT.Player(
        `youtube-player-${courseId}-${videoIndex}`,
        {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
          },
        }
      );
    }
  };

  const playVideo = (courseId, videoIndex) => {
    const player = playerRefs.current[`${courseId}-${videoIndex}`];
    if (player) player.playVideo();
  };

  const pauseVideo = (courseId, videoIndex) => {
    const player = playerRefs.current[`${courseId}-${videoIndex}`];
    if (player) player.pauseVideo();
  };

  const seekBackward = (courseId, videoIndex) => {
    const player = playerRefs.current[`${courseId}-${videoIndex}`];
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10, true);
    }
  };

  const seekForward = (courseId, videoIndex) => {
    const player = playerRefs.current[`${courseId}-${videoIndex}`];
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10, true);
    }
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
              <p><strong>Price:</strong> ${course.course.price}</p>
              <p><strong>Level:</strong> {course.course.level}</p>
              <p><strong>Duration:</strong> {course.course.duration} hours</p>
              <p><strong>Purchased on:</strong> {new Date(course.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Expiry Date:</strong> {new Date(course.expiryDate).toLocaleDateString()}</p>

              {/* Display video links only if the course has videos */}
              {Array.isArray(course.course.links) && course.course.links.length > 0 && (
                <div className="course-links">
                  <strong>Course Videos:</strong>
                  <ul>
                    {course.course.links.map((link, index) => (
                      <li key={index}>
                        <div
                          className="video-container"
                          id={`youtube-player-${course._id}-${index}`}
                          onContextMenu={disableRightClick}
                          style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: '100px',
                            width:'100px',
                            overflow: 'hidden',
                          }}
                          ref={() =>
                            initializePlayer(
                              course._id,
                              index,
                              link.split('v=')[1] // Extract video ID from link
                            )
                          }
                        ></div>

                        <p>Watch Video {index + 1}</p>

                        {/* Video Control Buttons */}
                        <div className="video-controls">
                          <button onClick={() => playVideo(course._id, index)}>Play</button>
                          <button onClick={() => pauseVideo(course._id, index)}>Pause</button>
                          <button onClick={() => seekBackward(course._id, index)}>Backward 10s</button>
                          <button onClick={() => seekForward(course._id, index)}>Forward 10s</button>
                        </div>
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
