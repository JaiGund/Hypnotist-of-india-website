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
      // Step 1: Request payment order from backend
      const { data } = await axios.post(
        `${url}/api/payment/order`,
        { courseId },
        { withCredentials: true } // Include cookies for authentication
      );

      // Step 2: Load Razorpay script
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

      // Step 3: Initialize Razorpay
      const options = {
        key: data.razorpayKey, // Razorpay key from backend
        amount: data.amount, // Amount in paisa
        currency: data.currency, // INR by default
        name: 'Meditation Of India',
        description: course.title,
        order_id: data.orderId, // Razorpay order ID
        handler: async (response) => {
          try {
            // Step 4: Verify the payment on backend
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

      <div className="button-container">
        <button onClick={() => handlePurchase(course._id)}>Buy Course</button>
      </div>
    </div>
  );
};

export default CourseDetails;
