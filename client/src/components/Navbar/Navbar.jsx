import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="right-side">
        <Link to={"/"} className="main-heading">
          <h2>Meditation Of India</h2>
        </Link>
      </div>
      <div className="left-side">
        <Link to={"/"} className="route-links">
          <p>Home</p>
        </Link>
        <Link to={"/courses"} className="route-links">
          <p>Courses</p>
        </Link>
        <Link to="/bookapointment" className="route-links">
          <p>Book An Appointment</p>
        </Link>
        <Link to="/mydashboard" className="route-links">
          <p>My Dashboard</p>
        </Link>
      </div>
      <div className="sign-in">
        {isAuthenticated ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
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
