// src/Components/EmotionDetection.jsx
import React, { useState } from "react";

const EmotionDetection = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Logic to send image to backend
    console.log("Image submitted:", image);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Emotion Detection</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Detect Emotion
      </button>
    </div>
  );
};

export default EmotionDetection;
