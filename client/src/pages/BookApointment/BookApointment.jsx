import React, { useContext, useState } from 'react';
import axios from 'axios';
import './BookApointment.css';
import { AuthContext } from '../../context/AuthContext';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    date: '',
    time: '',
    sessionType: '',
    concerns: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const {url} = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/appointments`, formData);
      console.log('Response:', response.data);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while booking your appointment.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="book-appointment">
      <h1>Book Your Appointment</h1>
      <p className="intro-text">Take the first step towards a better you. Fill out the form below to schedule your session.</p>

      {!submitted ? (
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Preferred Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sessionType">Session Type</label>
            <select
              id="sessionType"
              name="sessionType"
              value={formData.sessionType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="meditation">Meditation</option>
              <option value="hypnosis">Hypnosis</option>
              <option value="counseling">Counseling</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="concerns">Specific Concerns (Optional)</label>
            <textarea
              id="concerns"
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Book Appointment
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <div className="thank-you">
          <h2>Thank You!</h2>
          <p>Your appointment request has been submitted. We will contact you shortly to confirm the details.</p>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
