import os
import mediapipe as mp
import cv2
import pickle

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

DATA_DIR = './data'
data = [] # a list of list that contains the x and y cooedinates based on dir_(0,1,2)
label = [] # contains the labels of the respected data

for dir_ in os.listdir(DATA_DIR):
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        data_container = [] # a list of x and y coordinates of each landmark (total 21 landmarks)
        
        results = hands.process(img_rgb) # mediapipe requires images in rbg formats
        
        if results.multi_hand_landmarks: # if hands is there is present in the images
            for hand_landmarks in results.multi_hand_landmarks: # for each landmark in each hand present
                for i in range(len(hand_landmarks.landmark)): # for loop to access each x and y coordinates of each landmark
                    x = hand_landmarks.landmark[i].x # accessing the x coordinate
                    y = hand_landmarks.landmark[i].y # accessing the y coordinate
                    data_container.append(x)
                    data_container.append(y)
        
            data.append(data_container)
            label.append(dir_)
            
f = open('data.pickle', 'wb')
pickle.dump({'data': data, 'label': label}, f)
f.close()
