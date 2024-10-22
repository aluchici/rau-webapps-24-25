from datetime import datetime
from flask import Flask, request, Response

app=Flask("app")

@app.route("/", methods=["GET"])
def home():
    print("Hello")
    return "<h1>Welcome to my page</h1>"

@app.route("/version", methods=["GET"])
def version():
    return {
        "version":"1.0.0",
        "requested_at": str(datetime.now())
    }

@app.route("/signin", methods=["GET", "POST"])
def signin():
    #1. receive data
    print(request)

    #2. validate data

    #3. check against the stored data
    #4. return a response based on the result obtained at 3.

if __name__ == "__main__":
    app.run(debug=True, port=5001)

