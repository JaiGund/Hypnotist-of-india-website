import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./SignIn.css";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:5000/api/auth/signin",
        formData,
        { withCredentials: true }
      );

      toast.success("Signed in successfully!"); // Show success toast
      
      setFormData({ email: "", password: "" }); // Clear the form
      
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid credentials"); // Show error toast
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
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
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
