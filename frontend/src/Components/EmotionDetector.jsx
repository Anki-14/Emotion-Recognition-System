// import React, { useRef, useState, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";
// import "./EmotionDetector.css";

// const EmotionDetection = () => {
//   const webcamRef = useRef(null);
//   const [emotion, setEmotion] = useState("");
//   const [mode, setMode] = useState("real-time"); // Toggle mode
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isDetecting, setIsDetecting] = useState(false);

//   // Function to capture frames for real-time analysis
//   const sendFrameToBackend = useCallback(async () => {
//     if (!webcamRef.current || !isDetecting) return;
    
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return;

//     const blob = await fetch(imageSrc).then((res) => res.blob());
//     const formData = new FormData();
//     formData.append("image", blob, "webcam.jpg");

//     try {
//       const response = await axios.post("http://localhost:5000/detect-emotion", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setEmotion(response.data.emotion);
//     } catch (error) {
//       console.error("Error detecting emotion:", error);
//     }
//   }, [isDetecting]);

//   // Start/Stop real-time detection loop
//   useEffect(() => {
//     let interval;
//     if (mode === "real-time" && isDetecting) {
//       interval = setInterval(() => {
//         sendFrameToBackend();
//       }, 1000); // Adjust detection speed
//     }
//     return () => clearInterval(interval);
//   }, [mode, isDetecting, sendFrameToBackend]);

//   // Handle file upload for manual mode
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const uploadAndAnalyze = async () => {
//     if (!selectedFile) return;
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://localhost:5000/upload-emotion", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setEmotion(response.data.emotion);
//     } catch (error) {
//       console.error("Error detecting emotion:", error);
//     }
//   };

//   return (
//     <div className="detection-container">
//       <h1 className="detection-title">Emotion Detection System</h1>

//       {/* Toggle Mode */}
//       <div className="mode-toggle">
//         <button onClick={() => { setMode("real-time"); setIsDetecting(true); }} className={mode === "real-time" ? "active" : ""}>
//           Real-Time Mode
//         </button>
//         <button onClick={() => { setMode("manual"); setIsDetecting(false); }} className={mode === "manual" ? "active" : ""}>
//           Manual Mode
//         </button>
//       </div>

//       {mode === "manual" ? (
//         <>
//           <label className="upload-box">
//             Click to Upload or Drag & Drop Here
//             <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
//           </label>
//           <button onClick={uploadAndAnalyze} className="detect-btn">Detect</button>
//           {emotion && <h2 className="emotion-result">Detected Emotion: {emotion}</h2>}
//         </>
//       ) : (
//         <>
//           <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam" />
//           <button onClick={() => setIsDetecting(!isDetecting)} className="detect-btn">
//             {isDetecting ? "Stop Detection" : "Start Detection"}
//           </button>
//           {emotion && <h2 className="emotion-result">Detected Emotion: {emotion}</h2>}
//         </>
//       )}
//     </div>
//   );
// };

// export default EmotionDetection;
import React, { useState, useEffect } from "react";
import "./EmotionDetector.css";

const EmotionDetection = () => {
  const [emotion, setEmotion] = useState("");

  useEffect(() => {
    const fetchEmotion = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_emotion");
        const data = await response.json();
        setEmotion(data.emotion);
      } catch (error) {
        console.error("Error fetching emotion:", error);
      }
    };

    const interval = setInterval(fetchEmotion, 2000); // Fetch every 2 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="detection-container">
      <h1 className="detection-title">Real-Time Emotion Detection</h1>
      <img src="http://localhost:5000/video_feed" alt="Live Feed" className="webcam" />
      {emotion && <h2 className="emotion-result">Detected Emotion: {emotion}</h2>}
    </div>
  );
};

export default EmotionDetection;