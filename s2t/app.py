# app.py
from flask import Flask, render_template, request, jsonify, session
import cv2
import pickle
import mediapipe as mp
import numpy as np
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management

# Load the hand gesture recognition model
model_path = '../model.p'
if os.path.exists(model_path):
    with open(model_path, 'rb') as f:
        model_obj = pickle.load(f)
        model = model_obj['model']
else:
    print("Model file not found. Please ensure the model is trained and saved.")
    model = None

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.5, min_tracking_confidence=0.5)

result_dict = {
    0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h',
    8: 'i', 9: 'j', 10: 'k', 11: 'l', 12: 'm', 13: 'n', 14: 'o', 15: 'p',
    16: 'q', 17: 'r', 18: 's', 19: 't', 20: 'u', 21: 'v', 22: 'w', 23: 'x',
    24: 'y', 25: 'z'
}

def pad_data(data, target_length=84):
    if len(data) < target_length:
        return data + [0] * (target_length - len(data))
    return data[:target_length]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_info', methods=['POST'])
def submit_info():
    disability = request.form.get('disability')
    additional_info = request.form.get('additional_info')
    session['disability'] = disability
    session['additional_info'] = additional_info
    return jsonify({"message": "Information submitted successfully"})

@app.route('/camera')
def camera():
    return render_template('camera.html')

@app.route('/process_frame', methods=['POST'])
def process_frame():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"})
    
    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    
    if image is None:
        return jsonify({"error": "Invalid image file"})

    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)
    
    if not results.multi_hand_landmarks:
        return jsonify({"error": "No hand detected"})

    data_container = []
    for hand_landmark in results.multi_hand_landmarks:
        for i in range(len(hand_landmark.landmark)):
            x = hand_landmark.landmark[i].x
            y = hand_landmark.landmark[i].y
            data_container.append(x)
            data_container.append(y)

    padded_data = pad_data(data_container)
    
    if model is None:
        return jsonify({"error": "Model not loaded"})

    prediction = model.predict([np.asarray(padded_data)])
    predicted_class = int(prediction[0])
    
    if predicted_class not in result_dict:
        return jsonify({"error": "Unrecognized gesture"})

    recognized_char = result_dict[predicted_class]
    return jsonify({"recognized_char": recognized_char})

@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    keyword = request.json.get('keyword')
    disability = session.get('disability')
    additional_info = session.get('additional_info')

    # This is where you would implement the logic to fetch recommendations
    # based on the keyword and user's disability information
    # For now, we'll return a placeholder response
    recommendation = f"Based on your keyword '{keyword}' and {disability} disability: "
    if disability == "wheelchair":
        if keyword.lower() == "w":
            recommendation += "We recommend visiting Accessible Beach X, which has wheelchair ramps and beach wheelchairs available."
        elif keyword.lower() == "restaurant":
            recommendation += "Check out Inclusive Dining Y, known for its wheelchair-friendly layout and accessible menu options."
    elif disability == "visual_impairment":
        if keyword.lower() == "museum":
            recommendation += "Visit Tactile Arts Museum Z, offering audio descriptions and touch tours for visually impaired visitors."
    else:
        recommendation += "We're working on gathering more specific recommendations for your needs."

    return jsonify({"recommendation": recommendation})

if __name__ == '__main__':
    app.run(debug=True)