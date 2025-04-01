# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# from deepface import DeepFace

# app = Flask(__name__)
# CORS(app)

# # Load OpenCV face detection model
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# @app.route('/upload-emotion', methods=['POST'])
# def upload_emotion():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file'].read()
#     npimg = np.frombuffer(file, np.uint8)
#     img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

#     # Convert image to grayscale
#     gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#     # Detect faces
#     faces = face_cascade.detectMultiScale(gray_img, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     detected_emotions = []
#     for (x, y, w, h) in faces:
#         face_roi = img[y:y + h, x:x + w]

#         try:
#             result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
#             emotion = result[0]['dominant_emotion']
#         except:
#             emotion = "Unknown"

#         detected_emotions.append(emotion)

#     return jsonify({"emotion": detected_emotions[0] if detected_emotions else "No face detected"})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS
import cv2
import numpy as np
from deepface import DeepFace
import io

app = Flask(__name__)
CORS(app)

# Load OpenCV face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Initialize video capture
cap = cv2.VideoCapture(0)

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break

        # Convert frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)

        # Detect faces
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        emotion_detected = "Unknown"
        
        for (x, y, w, h) in faces:
            # Extract face ROI
            face_roi = rgb_frame[y:y + h, x:x + w]

            try:
                # Perform emotion analysis
                result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
                emotion_detected = result[0]['dominant_emotion']

                # Draw rectangle around face
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, emotion_detected, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

            except Exception as e:
                print("Emotion detection error:", str(e))

        # Encode frame to bytes
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_emotion', methods=['GET'])
def get_emotion():
    return jsonify({"emotion": "Happy"})  # Replace with dynamic value later

# Manual Image Upload Route
@app.route('/upload-emotion', methods=['POST'])
def upload_emotion():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file'].read()
    npimg = np.frombuffer(file, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Convert image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray_img, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    detected_emotions = []
    for (x, y, w, h) in faces:
        face_roi = img[y:y + h, x:x + w]

        try:
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
            emotion = result[0]['dominant_emotion']
        except:
            emotion = "Unknown"

        detected_emotions.append(emotion)

    return jsonify({"emotion": detected_emotions[0] if detected_emotions else "No face detected"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
