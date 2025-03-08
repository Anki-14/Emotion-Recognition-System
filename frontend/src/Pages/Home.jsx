// src/Pages/Home.jsx
import React from "react";
import "./Home.css"; // Import external CSS

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Emotion Recognition System</h1>
      <p className="home-text">
        Upload an image or use your webcam to detect emotions in real-time!
      </p>
    </div>
  );
};

export default Home;
