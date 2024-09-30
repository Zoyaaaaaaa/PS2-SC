import os
import mediapipe as mp
import cv2
import pickle
import numpy as np

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3, max_num_hands=1)

DATA_DIR = './data'
data = []
labels = []

def extract_hand_features(img_rgb):
    results = hands.process(img_rgb)
    if not results.multi_hand_landmarks:
        return None
    
    landmarks = results.multi_hand_landmarks[0]
    features = []
    for landmark in landmarks.landmark:
        features.extend([landmark.x, landmark.y, landmark.z])
    return features

for dir_ in os.listdir(DATA_DIR):
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        features = extract_hand_features(img_rgb)
        if features:
            data.append(features)
            labels.append(int(dir_))

# Convert to numpy arrays and normalize
data = np.array(data, dtype=np.float32)
labels = np.array(labels, dtype=np.int32)

# Normalize the data
data_mean = np.mean(data, axis=0)
data_std = np.std(data, axis=0)
data_normalized = (data - data_mean) / (data_std + 1e-8)

with open('data_normalized.pickle', 'wb') as f:
    pickle.dump({'data': data_normalized, 'labels': labels, 'mean': data_mean, 'std': data_std}, f)

print(f"Processed {len(data)} images")
print(f"Data shape: {data.shape}")
print(f"Labels shape: {labels.shape}")