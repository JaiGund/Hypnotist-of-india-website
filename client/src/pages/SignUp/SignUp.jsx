import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./SignUp.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    city: "",
    state: "",
  });
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      // Show success toast
      toast.success(response.data.msg);

      // Reset the form after success
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        password: "",
        city: "",
        state: "",
      });
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
