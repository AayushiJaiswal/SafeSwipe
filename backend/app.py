from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# Load trained model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route("/")
def home():
    return "✅ SafeSwipe backend is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data.get('features', [])

    # Validate input
    if not isinstance(features, list) or len(features) != 30 or not all(isinstance(f, (int, float)) for f in features):
        return jsonify({
            'error': 'Invalid input. Please send 30 numeric features in a list.'
        }), 400

    app.logger.info(f"Received features: {features}")

    # Predict
    features = np.array([features])
    prediction = model.predict(features)[0]
    probability = round(model.predict_proba(features)[0][1], 4)

    return jsonify({
        'fraud': bool(prediction),
        'probability': probability
    })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
