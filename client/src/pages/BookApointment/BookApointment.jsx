import React, { useState } from 'react';
import './BookApointment.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    date: '',
    time: '',
    concerns: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form Submitted:', formData);
    // Add API call or backend integration here
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
            <label htmlFor="concerns">Specific Concerns (Optional)</label>
            <textarea
              id="concerns"
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Book Appointment</button>
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
