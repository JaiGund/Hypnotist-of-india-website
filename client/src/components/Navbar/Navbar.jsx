import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to={'/sign-up'}><button>Sign In</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
