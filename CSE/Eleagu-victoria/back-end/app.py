from datetime import datetime
import json
from flask import Flask, request, Response

from authorize import create_account

app = Flask("app")

@app.route("/", methods=["GET"])
def home():
    return "<h1>Welcome to my page</h1>"

@app.route("/version", methods=["GET"])
def version():
    response = {
        "version": "1.0.0",
        "requested_at": str(datetime.now())
    }
    return response

@app.route("/signin", methods=["GET", "POST"])
def signin():
    # 1. receive data
    body = request.json

    # 2. validate data
    keys = list(body.keys())
    if not "email" in keys:
        return Response(json.dumps({"error": "Invalid request. Email not sent."}), 
                        status=400, 
                        headers={"Content-Type": "application/json"})
    
    if not "password" in keys:
        return Response(json.dumps({"error": "Invalid request. Password not sent."}), 
                        status=400, 
                        headers={"Content-Type": "application/json"})
    
    # 3. check against the stored data
    # 4. return a response based on the result obtained at 3. 
    return Response({}, status=200, headers={"Content-Type": "application/json"})

@app.route("/signup", methods=["POST"])
def signup():
    create_account()
    return ""


if __name__ == "__main__":
    app.run(debug=True, port=5001)
