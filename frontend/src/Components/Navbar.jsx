import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // Import external CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Link added to the logo/title */}
        <h2 className="nav-title">
          <Link to="/">Emotion Recognition System</Link>
        </h2>
        <ul className="nav-links">
          <li><Link to="/detect">Detect Emotion</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
