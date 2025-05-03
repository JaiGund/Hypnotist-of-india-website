import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseVideos.css';
import { AuthContext } from '../../context/AuthContext';

const CourseVideos = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [isYTReady, setIsYTReady] = useState(false);
  const playerRefs = useRef({});
  const { url,user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch all purchased courses
        const response = await axios.get(`${url}/api/mycourses`, { withCredentials: true });

        // Find the specific course by ID
        const purchasedCourse = response.data.find((course) => course._id === courseId);

        if (purchasedCourse) {
          setCourse(purchasedCourse.course); // Set the course data from the purchased course
        } else {
          setError('Course not found.');
        }
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchCourse();

    // Load YouTube IFrame API
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      setIsYTReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [courseId, url]);

  // Function to initialize the YouTube player
  const initializePlayer = (videoIndex, videoId) => {
    if (isYTReady && !playerRefs.current[videoIndex]) {
      playerRefs.current[videoIndex] = new window.YT.Player(`youtube-player-${videoIndex}`, {
        videoId: videoId,
        playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0, showinfo: 0, iv_load_policy: 3 },
      });
    }
  };

  // Play and pause video functions
  const playVideo = (videoIndex) => {
    const player = playerRefs.current[videoIndex];
    if (player) player.playVideo();
  };
  
  const pauseVideo = (videoIndex) => {
    const player = playerRefs.current[videoIndex];
    if (player) player.pauseVideo();
  };

  // Re-initialize the players after course data is loaded and YouTube API is ready
  useEffect(() => {
    if (course && isYTReady) {
      // Initialize players for all course videos
      course.links.forEach((link, index) => {
        const videoId = link.split('v=')[1];
        initializePlayer(index, videoId);
      });
    }
  }, [course, isYTReady]);

  return (
    <div className="course-videos-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : course ? (
        <div>
          <h2>{course.title} - Videos</h2>
          {Array.isArray(course.links) && course.links.length > 0 ? (
            <ul>
              {course.links.map((link, index) => (
                <li key={index}>
                  <div
                    id={`youtube-player-${index}`}
                    className="video-player"
                  ></div>
                  <div className="video-controls">
                    <button onClick={() => playVideo(index)}>Play</button>
                    <button onClick={() => pauseVideo(index)}>Pause</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No videos available for this course.</p>
          )}
        </div>
      ) : (
        <p className="loading-message">Loading course details...</p>
      )}
    </div>
  );
};

export default CourseVideos;
