import cv2
import matplotlib.pyplot as plt
from deepface import DeepFace

# Load the image
image_path = "sad.png"  # Change this to your image path
image = cv2.imread(image_path)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Analyze the image using DeepFace
result = DeepFace.analyze(image, actions=['emotion'])

# Get the dominant emotion
emotion = result[0]['dominant_emotion']

# Display the image and detected emotion
plt.imshow(image)
plt.axis("off")
plt.title(f"Detected Emotion: {emotion}", fontsize=14)
plt.show()

print(f"Emotion detected: {emotion}")
