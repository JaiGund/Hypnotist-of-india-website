import React from 'react';
import './Courses.css';

const Courses = () => {
  return (
    <div className="courses-page">
      <h1>Explore Our Hypnosis Courses</h1>
      <p className="intro-text">Unlock the power of hypnosis with our expertly designed courses for beginners and professionals alike.</p>

      <div className="courses-container">
        {/* Course 1 */}
        <div className="course-card">
          <h2>Self-Hypnosis Mastery</h2>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/OdOwbLe8vF4"
              title="Self-Hypnosis Mastery"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p>
            Empower yourself by mastering self-hypnosis techniques. Learn to relax, focus, and enhance your well-being in this comprehensive course.
          </p>
          <button>Enroll Now</button>
        </div>

        {/* Course 2 */}
        <div className="course-card">
          <h2>Hypnotherapy Certification</h2>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/5E3JNBl0u-s"
              title="Hypnotherapy Certification"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p>
            Become a certified hypnotherapist with this professional training course. Perfect for those who want to help others through hypnosis.
          </p>
          <button>Enroll Now</button>
        </div>

        {/* Course 3 */}
        <div className="course-card">
          <h2>Quit Smoking with Hypnosis</h2>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/sGPffmF7RSo"
              title="Quit Smoking with Hypnosis"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p>
            A specialized course designed to help you or your clients quit smoking using the power of hypnosis and mental reprogramming.
          </p>
          <button>Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
