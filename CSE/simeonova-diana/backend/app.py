from datetime import datetime
from flask import Flask, json, request, Response

app = Flask("app")


@app.route("/", methods=["GET"])
def home():
    return "<h1>Welcome to my page </h1>"


@app.route("/version", methods=["GET"])
def version():
    return {
        "version": "1.0.0",
        "requested_at": str(datetime.now())
    }
    
@app.route("/signin", methods=["GET", "POST"])
def signin():
    # 1. recieve data
    print(request)
    body = request.json
    # 2. validate data
    keys = list(body.keys())
    if not "email" in keys:
        return Response(json.dumps({"error": "Invalid request. Email not sent."}), status=400, headers={"Content-Type": "application/json"})
    
    if not "password" in keys:
        return Response(json.dumps({"error": "Invalid request. Password not sent."}), status=400, headers={"Content-Type": "application/json"})
    # 3. check against stored data
    # 4. return a response based on the result obtained at 3
    return {}, {"Content-Type": "application/json"}
    

if __name__ == "__main__":
    app.run(port=5001)