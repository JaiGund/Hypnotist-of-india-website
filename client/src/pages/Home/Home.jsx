import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Connect with Your Mind, Body, and Soul</h1>
            <p>Welcome to Meditation Center of India, the online meditation platform that makes practicing mindfulness easier than ever.</p>
            <Link to={'/bookapointment'}><button className="cta-button">Start Now</button></Link>
          </div>
          <div className="hero-image">
            <img src="https://static.wixstatic.com/media/11062b_f87a3c7eba424bd9bcb995008f52dbac~mv2.jpg/v1/crop/x_321,y_0,w_4650,h_6200/fill/w_408,h_549,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_f87a3c7eba424bd9bcb995008f52dbac~mv2.jpg" alt="Person meditating in lotus position" />
          </div>
        </div>
      </div>  

      {/* Benefits Section - "Discover Inner Peace" */}
      <div className="benefits-section">
        <h2>Discover Inner Peace and Wellbeing</h2>
        <p>Through our guided meditation techniques and mindfulness practices, we help you find peace and calm in the comfort of your own home. Our experienced instructors offer soothing guidance you can follow along with anytime, anywhere, bringing the power of mindfulness into your daily life.</p>
        <Link to={'/about'}><button className="secondary-button">Learn More</button></Link>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <h2>Online Courses</h2>
        <div className="courses-list">
          <div className="course-card">
            <div className="course-image yoga-image"></div>
            <h3>Yoga for Beginners</h3>
            <p>A gentle introduction to yoga postures and breathing techniques.</p>
            <button>Learn More</button>
          </div>
          <div className="course-card">
            <div className="course-image mindfulness-image"></div>
            <h3>Mindfulness & Meditation</h3>
            <p>Learn to quiet your mind and find peace in the present moment.</p>
            <button>Learn More</button>
          </div>
          <div className="course-card">
            <div className="course-image movement-image"></div>
            <h3>Movement & Breathing</h3>
            <p>Connect your breath with flowing movements for total harmony.</p>
            <button>Learn More</button>
          </div>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="instructor-section">
        <h2>YOUR INSTRUCTOR</h2>
        <div className="instructor-content">
          <div className="instructor-image"></div>
          <div className="instructor-info">
            <h3>Shreya Patel</h3>
            <p>With over 15 years of experience in mindfulness and meditation practices, Shreya guides you through a transformative journey toward inner peace and self-discovery.</p>
            <Link to={'/instructor'}><button>Read More</button></Link>
          </div>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="footer-cta">
        <h2>Begin Your Meditation Journey Today</h2>
        <p>Transform your life with mindfulness practices designed for modern living</p>
        <Link to={'/courses'}><button>Explore Courses</button></Link>
      </div>
    </div>
  );
};

export default Home;