from datetime import datetime
import json
# from sqlite3 import connect
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from entities import User
from storage  import connect

app = Flask(__name__)
CORS(app)  # Allow all domains by default

@app.route("/", methods=["GET"])
def home():
    return "<h1>Welcome to my page</h1>"

@app.route("/version", methods=["GET"])
def version():
    response = {
        "version": "1.0.0",
        "requested_at": str(datetime.now())
    }
    return jsonify(response)

@app.route("/signin", methods=["GET", "POST"])
def signin():
    body = request.json
    if not body or "email" not in body or "password" not in body:
        return jsonify({"error": "Invalid request. Email or password not sent."}), 400
    
    user = User()
    try:
        user.get_by_email(email=body["email"])
        if user.password == body["password"]:
            return jsonify({"data": {"id": user.id, "first_name": user.first_name}}), 200
        else:
            return jsonify({"error": "User email or password are wrong."}), 400
    except Exception:
        return jsonify({"error": "User missing."}), 404

@app.route("/signup", methods=["POST"])
def signup():
    body = request.json
    connection=connect()
    user = User()
    print(body)
    try:
        user.from_dict(body)
        user.get_by_email(dbconnection=connection, email=user.email)
        if user.id is not None:
            return jsonify({"error": "User already exists."}), 400
        
        user.is_active = 1
        user.created_at = datetime.now().timestamp()
        user.updated_at = user.created_at
        connection=connect()
        user.insert(dbconnection=connection)
        connection=connect()
        user.get_by_email(dbconnection=connection, email=user.email)
        return jsonify({"data": {"id": user.id, "first_name": user.first_name}}), 200
        
    except Exception as e:
        return jsonify({"error": f"Something went wrong. Cause: {str(e)}."}), 400

@app.route('/complete-signup', methods=['POST'])
def complete_signup():
    file = request.files.get('file')
    photo = request.files.get('photo')
    
    if file and photo:
        return jsonify({'message': 'Signup completed successfully!'}), 200
    return jsonify({'error': 'Files are missing.'}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5001)
