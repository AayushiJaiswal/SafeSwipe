from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load trained model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']

    # Check if input has 30 features
    if len(features) != 30:
        return jsonify({'error': 'Invalid input. Expected 30 features, but got {}.'.format(len(features))}), 400

    # Convert to NumPy array and make predictions
    features = np.array([features])
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]
    return jsonify({'fraud': bool(prediction), 'probability': probability})

if __name__ == '__main__':
    app.run(debug=True)
