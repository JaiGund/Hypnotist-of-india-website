import React, { useContext, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../../components/YouTubeEmbed/YoutubeEmbed';

const Home = () => {

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Hypnotist of India</h1>
        <p>Unlock the power of your subconscious mind to achieve your goals and live a healthier, happier life.</p>
        <Link to={'/bookapointment'}><button className="cta-button">Book an Appointment</button></Link>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <h2>Our Hypnosis Courses</h2>
        <div className="courses-list">
          <div className="course-card">
            <h3>Self-Hypnosis Mastery</h3>
            <p>Learn to empower yourself through the art of self-hypnosis and take control of your life.</p>
            <button>Learn More</button>
          </div>
          <div className="course-card">
            <h3>Hypnotherapy Certification</h3>
            <p>Become a certified hypnotherapist and help others unlock their potential.</p>
            <button>Learn More</button>
          </div>
          <div className="course-card">
            <h3>Overcome Anxiety & Stress</h3>
            <p>Explore techniques to manage anxiety, stress, and other mental challenges effectively.</p>
            <button>Learn More</button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Why Choose Hypnosis?</h2>
        <ul>
          <li>Improve focus and concentration.</li>
          <li>Break free from bad habits like smoking.</li>
          <li>Reduce anxiety and enhance relaxation.</li>
          <li>Boost self-confidence and achieve your goals.</li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonial">
          <p>"Hypnosis has truly changed my life! I feel more confident and focused than ever."</p>
          <span>- Sarah K.</span>
        </div>
        <div className="testimonial">
          <p>"The hypnotherapy course was amazing. Now I help others overcome their challenges!"</p>
          <span>- John D.</span>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="footer-cta">
        <h2>Start Your Hypnosis Journey Today!</h2>
        <Link to={'/courses'}><button>Explore Courses</button></Link>
      </div>
    </div>
  );
};

export default Home;
