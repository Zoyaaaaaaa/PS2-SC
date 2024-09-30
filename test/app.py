from flask import Flask, render_template, request, Response, jsonify
import cv2
import pickle
import mediapipe as mp
import numpy as np

app = Flask(__name__)

# Load the model and normalization parameters
with open('model.pickle', 'rb') as f:
    model_data = pickle.load(f)
    model = model_data['model']
    data_mean = model_data['mean']
    data_std = model_data['std']

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)

result_dict = {i: chr(ord('a') + i) for i in range(26)}

def extract_hand_features(frame):
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)
    if not results.multi_hand_landmarks:
        return None
    
    landmarks = results.multi_hand_landmarks[0]
    features = []
    for landmark in landmarks.landmark:
        features.extend([landmark.x, landmark.y, landmark.z])
    return features

def get_recommendations(disability, keyword):
    # This is a placeholder function. In a real application, you would implement
    # logic to fetch recommendations from a database or API based on the disability and keyword.
    recommendations = {
        'wheelchair': {
            'b': ["Accessible Beach 1", "Wheelchair-friendly Beach 2"],
            'p': ["Accessible Park 1", "Wheelchair-friendly Park 2"],
        },
        'hearing_impaired': {
            'm': ["Museum with Sign Language Tours 1", "Deaf-friendly Museum 2"],
            't': ["Theater with Captioning 1", "Deaf-friendly Theater 2"],
        },
        'visually_impaired': {
            'r': ["Restaurant with Braille Menu 1", "Visually Impaired Friendly Restaurant 2"],
            'l': ["Library with Audio Books 1", "Visually Impaired Friendly Library 2"],
        }
    }
    return recommendations.get(disability, {}).get(keyword.lower(), ["No specific recommendations available"])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/camera', methods=['POST'])
def camera():
    disability = request.form.get('disability')
    return render_template('camera.html', disability=disability)

def gen_frames():
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/recognize_sign', methods=['POST'])
def recognize_sign():
    frame_data = request.json['frame']
    disability = request.json['disability']
    keyword = request.json['keyword']

    # Decode base64 image
    frame_array = np.frombuffer(base64.b64decode(frame_data.split(',')[1]), dtype=np.uint8)
    frame = cv2.imdecode(frame_array, cv2.IMREAD_COLOR)

    features = extract_hand_features(frame)
    if features:
        features_normalized = (np.array(features) - data_mean) / (data_std + 1e-8)
        prediction = model.predict([features_normalized])
        predicted_class = int(prediction[0])

        if predicted_class in result_dict:
            recognized_char = result_dict[predicted_class]
            if recognized_char.lower() == keyword.lower():
                recommendations = get_recommendations(disability, keyword)
                return jsonify({'match': True, 'char': recognized_char, 'recommendations': recommendations})
            else:
                return jsonify({'match': False, 'char': recognized_char})
    
    return jsonify({'match': False, 'char': None})

if __name__ == '__main__':
    app.run(debug=True)