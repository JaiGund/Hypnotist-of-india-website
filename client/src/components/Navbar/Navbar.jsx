import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the token cookie exists
        const response = await axios.get("http://localhost:5000/api/auth/validate-token", {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.isAuthenticated); // Update state based on response
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false); // Default to logged out if an error occurs
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false); // Update state
      navigate("/sign-in"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="right-side">
        <Link to={"/"} className="main-heading">
          <h2>Hypnotist Of India.</h2>
        </Link>
      </div>
      <div className="left-side">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <Link to={"/courses"}>
          <p>Courses</p>
        </Link>
        <Link to="/bookapointment">
          <p>Book An Appointment</p>
        </Link>
      </div>
      <div className="sign-in">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button> // Logout button if logged in
        ) : (
          <Link to={"/sign-in"}>
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
