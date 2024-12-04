from datetime import datetime
import json
import os
from flask import Flask, request, Response
from flask_cors import CORS


FILE_STORAGE_PATH = "files"
if not os.path.exists(FILE_STORAGE_PATH):
    os.makedirs(FILE_STORAGE_PATH)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Your existing routes...
def check_existing_user(username):
    if os.path.exists("users.txt"):
        with open("users.txt", "r") as file:
            for line in file:
                existing_username = line.strip().split(":")[0]
                if existing_username == username:
                    return True
    return False

def save_user(username, password):
    file_path = os.path.join(os.getcwd(), 'users.txt')
    with open(file_path, "a") as file:
        file.write(f"{username}:{password}\n")

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     username = data['username']
#     password = data['password']

#     if check_existing_user(username):
#         return jsonify({"message": "Username already exists!"}), 400

#     save_user(username, password)
#     return jsonify({"message": "Registration successful!"}), 200

@app.route("/upload", methods=["POST"])
def upload():
    if "selfieFile" not in request.files:
        response = Response(json.dumps({"error":f"Something went wrong. Cause: No file part."}),
                            status=400,
                            headers={"Content-Type":"application/json"})
        return response
    file=request.files['selfieFile']
    if file.filename=="":
        response=Response(json.dumps({"error":f"Something went wrong. Cause: No selected file."}),
                          status=400,
                          headers={"Content-Type":"application//json"})
        return response
    file_path=os.path.join(FILE_STORAGE_PATH, file.filename)
    file.save(file_path)
    
    response=Response(json.dumps({"message":f"File {file.filename} successfully uploaded."}),
                      status=200,
                      headers={"Content-Type":"application/json"})
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5001)