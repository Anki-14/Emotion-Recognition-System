from flask import Flask, Response, request, jsonify, send_file
import cv2
import numpy as np
from deepface import DeepFace
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load face cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files['image'].read()
    npimg = np.frombuffer(image, np.uint8)
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

        # Draw a bounding box & label
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(img, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Convert processed image to bytes
    _, buffer = cv2.imencode('.jpg', img)
    processed_image = io.BytesIO(buffer)

    # Return the processed image with face boxes and emotions
    return send_file(processed_image, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
