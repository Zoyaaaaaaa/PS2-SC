import cv2
import pickle
import mediapipe as mp
import numpy as np

# Load the model and normalization parameters
with open('model.pickle', 'rb') as f:
    model_data = pickle.load(f)
    model = model_data['model']
    data_mean = model_data['mean']
    data_std = model_data['std']

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)

cap = cv2.VideoCapture(0)

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

recognized_text = ""

while True:
    ret, frame = cap.read()
    if not ret:
        break

    cv2.putText(frame, "Press 'c' to capture, 'r' to reset, 'q' to quit", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    cv2.putText(frame, f"Recognized: {recognized_text}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    cv2.imshow('Sign Language Recognition', frame)

    key = cv2.waitKey(1)
    if key == ord('q'):
        break
    elif key == ord('r'):
        recognized_text = ""
    elif key == ord('c'):
        features = extract_hand_features(frame)
        if features:
            # Normalize the features
            features_normalized = (np.array(features) - data_mean) / (data_std + 1e-8)
            
            prediction = model.predict([features_normalized])
            predicted_class = int(prediction[0])
            
            if predicted_class in result_dict:
                res_char = result_dict[predicted_class]
                recognized_text += res_char
                print(f"Recognized Character: {res_char}")
            else:
                print(f"Unrecognized prediction: {predicted_class}")

        # Display hand landmarks
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
        
        cv2.imshow('Sign Language Recognition', frame)
        cv2.waitKey(1000)  # Display the result for 1 second

cap.release()
cv2.destroyAllWindows()