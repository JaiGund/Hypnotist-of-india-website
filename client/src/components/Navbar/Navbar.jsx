import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left-side">
        <Link to={"/"} className="main-heading">
          <h2>Meditation Center Of India</h2>
        </Link>
      </div>
      <div className="center-nav">
        <Link to={"/"} className="route-links">
          <p>HOME</p>
        </Link>
        {/* <Link to={"/about"} className="route-links">
          <p>ABOUT</p>
        </Link> */}
        <Link to={"/courses"} className="route-links">
          <p>COURSES</p>
        </Link>
        <Link to="/bookapointment" className="route-links">
          <p>BOOK NOW</p>
        </Link>
        <Link to="/mydashboard" className="route-links">
          <p>DASHBOARD</p>
        </Link>
        <Link to="/contact" className="route-links">
          <p>CONTACT</p>
        </Link>
      </div>
      <div className="right-side">
        {isAuthenticated ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to={"/sign-in"}>
            <button className="sign-in-btn">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;