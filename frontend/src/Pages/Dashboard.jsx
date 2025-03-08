import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import external CSS

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your Dashboard</h1>

      <div className="section">
        <h2 className="section-title">User Profile</h2>
        <div className="profile">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">Past Emotion Analysis</h2>
        <div className="past-analysis">
          <div className="card">
            <img src="image_url" alt="emotion" />
            <p>Emotion: Happy</p>
          </div>
          <div className="card">
            <img src="image_url" alt="emotion" />
            <p>Emotion: Sad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
