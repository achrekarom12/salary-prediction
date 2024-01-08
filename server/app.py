from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

# Load the saved model
model = pickle.load(open('model.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        years_experience = float(request.json['years_experience'])

        prediction = model.predict([[years_experience]])

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
