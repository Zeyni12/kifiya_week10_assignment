from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
from flask_cors import CORS

# Load the trained model
model = load('./Brent_analysis_model.pkl')

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        df = pd.DataFrame[data]
        
        prediction = model.predict(df)[0]

        print(f"Prediction: {prediction}")

        return jsonify({"price": int(prediction)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to Brent Oil Prediction API"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
