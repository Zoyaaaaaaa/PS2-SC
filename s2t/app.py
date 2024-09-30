# app.py
from flask import Flask, render_template, request, jsonify, session
import cv2
import pickle
import mediapipe as mp
import numpy as np
import os
import logging
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management
app.config['DEBUG'] = True  # Enable debug mode

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load and preprocess the data
def load_and_preprocess_data(data_dir):
    data = []
    labels = []
    for dir_ in os.listdir(data_dir):
        for img_path in os.listdir(os.path.join(data_dir, dir_)):
            img = cv2.imread(os.path.join(data_dir, dir_, img_path))
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
            results = hands.process(img_rgb)
            if results.multi_hand_landmarks:
                landmarks = results.multi_hand_landmarks[0]
                data_container = []
                for landmark in landmarks.landmark:
                    data_container.extend([landmark.x, landmark.y, landmark.z])
                data.append(data_container)
                labels.append(dir_)
    
    return np.array(data), np.array(labels)

# Initialize MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)

# Load or train the model
DATA_DIR = './data'
model_path = 'model.p'

try:
    if os.path.exists(model_path):
        with open(model_path, 'rb') as f:
            model_dict = pickle.load(f)
            model = model_dict['model']
        app.logger.info("Model loaded successfully.")
    else:
        app.logger.info("Training new model...")
        data, labels = load_and_preprocess_data(DATA_DIR)
        x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, random_state=42)
        
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(x_train, y_train)
        
        accuracy = model.score(x_test, y_test)
        app.logger.info(f"Model trained. Accuracy: {accuracy:.2f}")
        
        with open(model_path, 'wb') as f:
            pickle.dump({'model': model}, f)
        app.logger.info("Model saved successfully.")
except Exception as e:
    app.logger.error(f"Error loading/training model: {str(e)}")
    model = None

# Mapping of class indices to characters
result_dict = {str(i): chr(ord('a') + i) for i in range(26)}

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
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        
        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)
        
        if not results.multi_hand_landmarks:
            return jsonify({"error": "No hand detected"}), 400

        landmarks = results.multi_hand_landmarks[0]
        data_container = []
        for landmark in landmarks.landmark:
            data_container.extend([landmark.x, landmark.y, landmark.z])

        app.logger.debug(f"Data container shape: {np.array(data_container).shape}")
        
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        prediction = model.predict([data_container])
        predicted_class = prediction[0]
        
        app.logger.debug(f"Predicted class: {predicted_class}")
        
        if predicted_class not in result_dict:
            return jsonify({"error": "Unrecognized gesture"}), 400

        recognized_char = result_dict[predicted_class]
        return jsonify({"recognized_char": recognized_char})
    except Exception as e:
        app.logger.error(f"Error processing frame: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    try:
        keyword = request.json.get('keyword')
        disability = session.get('disability')
        additional_info = session.get('additional_info')

        # Implement more sophisticated recommendation logic here
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
    except Exception as e:
        app.logger.error(f"Error getting recommendation: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)