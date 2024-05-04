from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from perspective import get_perspective
from prediction import run

app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)

# Run the prediction model on the given URL
def func():
    data = request.get_json()
    if data is None:
        return {}
    url = data["url"]
    perspective = get_perspective(url)
    score = run(url) # The probability of the article being reliable news
 
    return_data = {"score": score, "vote": [124, 211], "perspective": perspective}
    return jsonify(return_data)

if __name__ == "__main__":
    app.run(debug=True)
