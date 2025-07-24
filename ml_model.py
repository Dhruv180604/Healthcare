from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # or pickle

app = Flask(__name__)
CORS(app)

# Load your ML model (trained previously)
model = joblib.load('your_model.pkl')  # use your actual file

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = int(data['age'])
    gender = 1 if data['gender'] == 'Male' else 0
    symptoms = data['symptoms']  # optionally encode or vectorize

    # Dummy example: just send a label
    # Replace with your actual preprocessing + model prediction
    features = [age, gender]  # Extend with encoded symptoms
    prediction = model.predict([features])[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(port=8000)
