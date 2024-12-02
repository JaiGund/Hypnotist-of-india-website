import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css';
import { AuthContext } from '../../context/AuthContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { url } = useContext(AuthContext);

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

  const handlePurchase = async (courseId) => {
    try {
      const { data } = await axios.post(
        `${url}/api/payment/order`,
        { courseId },
        { withCredentials: true }
      );

      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        console.error('Razorpay SDK failed to load.');
        return;
      }

      const options = {
        key: data.razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: 'Meditation Of India',
        description: course.title,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${url}/api/payment/verify`,
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                courseId,
              },
              { withCredentials: true }
            );
            console.log(verifyResponse.data.message);
          } catch (err) {
            console.error('Error verifying payment:', err);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error during purchase:', err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-page">
      <div className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-subtitle">{course.subtitle || 'Learn to master this topic effortlessly!'}</p>
      </div>

      <div className="course-content">
        {/* Left Section */}
        <div className="course-main">
          <ul className="tabs">
            <li>Description</li>
            {/* <li>Course Content</li>
            <li>Teacher</li>
            <li>Reviews</li> */}
          </ul>
          <div className="course-description">
            <h2>About this course</h2>
            <p>{course.description}</p>

            <h3>What you will learn</h3>
            <ul>
              {course.learningPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="course-sidebar">
          <img
            src={course.thumbnail || 'https://via.placeholder.com/300x180?text=No+Thumbnail'}
            alt={course.title}
            className="course-thumbnail"
          />
          <div className="price-section">
            <h2>₹{course.price}</h2>
            <button className="purchase-button" onClick={() => handlePurchase(course._id)}>
              Start Course
            </button>
          </div>
          <div className="course-meta">
            <p>📚 {course.contentCount} Lessons</p>
            <p>⏱ {course.duration} hours</p>
            <p>🌟 {course.rating} ({course.reviewsCount} Reviews)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
