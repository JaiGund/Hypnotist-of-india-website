import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseVideos.css';
import { AuthContext } from '../../context/AuthContext';
import { loadYouTubeAPI } from '../../../utils/loadYouTubeAPI';

const CourseVideos = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const playerRefs = useRef({});
  const { url } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/mycourses`, { withCredentials: true });
        const purchasedCourse = response.data.find((c) => c._id === courseId);
        if (purchasedCourse) {
          setCourse(purchasedCourse.course);
        } else {
          setError('Course not found.');
        }
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchData();
  }, [courseId, url]);

  useEffect(() => {
    const initializePlayers = async () => {
      if (!course || !Array.isArray(course.links) || course.links.length === 0) return;

      const YT = await loadYouTubeAPI();

      course.links.forEach((link, index) => {
        const videoId = extractVideoId(link);
        const playerContainerId = `youtube-player-${index}`;

        const waitForIframe = setInterval(() => {
          const container = document.getElementById(playerContainerId);
          if (container && YT && typeof YT.Player === 'function' && !playerRefs.current[index]) {
            clearInterval(waitForIframe);
            playerRefs.current[index] = new YT.Player(playerContainerId, {
              videoId: videoId,
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
              },
            });
          }
        }, 300);
      });
    };

    initializePlayers();
  }, [course]);

  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const playVideo = (index) => playerRefs.current[index]?.playVideo();
  const pauseVideo = (index) => playerRefs.current[index]?.pauseVideo();

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
                  <div id={`youtube-player-${index}`} className="video-player"></div>
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
