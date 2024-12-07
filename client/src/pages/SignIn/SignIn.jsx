import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated, url } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home if authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/auth/signin`,
        formData,
        { withCredentials: true }
      );

      toast.success("Signed in successfully!");
      setFormData({ email: "", password: "" });
      setIsAuthenticated(true); // Update context state
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid credentials");
      console.error(error);
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/sign-up");
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
      <div className="signup-link">
        <p>
          Don't have an account?{" "}
          <span onClick={handleSignUpRedirect} className="link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
