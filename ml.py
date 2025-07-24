from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Simulate logic for personalized analysis
    risk_score = 0
    if data['stress'] == "High":
        risk_score += 25
    if int(data['sleep']) < 6:
        risk_score += 20
    if data['exercise'] == "None":
        risk_score += 15
    if "anxiety" in data['symptoms'].lower():
        risk_score += 20
    if data['medication'] == "Yes":
        risk_score += 10

    # Personal suggestion
    if risk_score >= 60:
        suggestion = "⚠️ High concern – Seek professional health advice."
    elif risk_score >= 30:
        suggestion = "⚠️ Moderate concern – Improve lifestyle & monitor symptoms."
    else:
        suggestion = "✅ Low concern – Maintain current lifestyle."

    return jsonify({
        "result": suggestion,
        "risk_score": risk_score
    })

if __name__ == '__main__':
    app.run(port=5001)
