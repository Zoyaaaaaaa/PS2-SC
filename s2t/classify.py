import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load the data
data_set = pickle.load(open('./data.pickle', 'rb'))

# Check if all data entries have consistent shape
data = data_set['data']
max_length = max([len(item) for item in data])

# Ensure all entries have the same length by padding
data = [item + [0] * (max_length - len(item)) if len(item) < max_length else item[:max_length] for item in data]

# Convert the data and labels to numpy arrays
data = np.asarray(data)
label = np.asarray(data_set['label'])

# Split the dataset
x_train, x_test, y_train, y_test = train_test_split(data, label, test_size=0.2, shuffle=True)

# Train the RandomForestClassifier model
model = RandomForestClassifier()
model.fit(x_train, y_train)

# Predict using the test set
predict = model.predict(x_test)
print(predict)

# Save the trained model using pickle
with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)
