import cv2
import pickle
import mediapipe as mp
import numpy as np

cap = cv2.VideoCapture(0)

model_obj = pickle.load(open('./model.p', 'rb'))
model = model_obj['model']

print(model)
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(max_num_hands=1, static_image_mode=True, min_detection_confidence=0.3)

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

recognized_text = ""

while True:
    # Continuously update the frame
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # Display instructions and recognized text
    cv2.putText(frame, "Press 'c' to capture, 'r' to reset, 'q' to quit", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    cv2.putText(frame, f"Recognized: {recognized_text}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    cv2.imshow('frame', frame)

    # Wait for key press
    key = cv2.waitKey(1)
    
    if key == ord('q'):
        break
    elif key == ord('r'):
        recognized_text = ""
    elif key == ord('c'):
        # Process the current frame
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)
        
        data_container = []
        if results.multi_hand_landmarks:
            for hand_landmark in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,
                    hand_landmark,
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style()
                )

                for i in range(len(hand_landmark.landmark)):
                    x = hand_landmark.landmark[i].x
                    y = hand_landmark.landmark[i].y
                    data_container.append(x)
                    data_container.append(y)

            padded_data = pad_data(data_container)
            
            prediction = model.predict([np.asarray(padded_data)])
            predicted_class = int(prediction[0])
            if predicted_class in result_dict:
                res_char = result_dict[predicted_class]
                recognized_text += res_char
                print(f"Prediction: {predicted_class}, Recognized Character: {res_char}")
            else:
                print(f"Unrecognized prediction: {predicted_class}")

        # Display the updated frame with landmarks
        cv2.putText(frame, f"Recognized: {recognized_text}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('frame', frame)
        cv2.waitKey(1000)  # Display the result for 1 second

cap.release()
cv2.destroyAllWindows()