from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)

def func():
    data = request.get_json()
    if data is None:
        return {}
    
    return_data = {"score": 0.5, "votes": [100, 200]}
    return jsonify(return_data)

if __name__ == "__main__":
    app.run(debug=True)