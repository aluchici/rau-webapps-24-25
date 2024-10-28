import json
from flask import Flask, render_template, request, Response
from datetime import datetime
  
import os

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    print("hello")
    return "<h1>Welcome to my page</h1><p>Sign in <a href=\"signin\">here</a></p><p>Check Version <a href=\"version\">here</a></p>"

@app.route("/version", methods=["GET"])
def version():
    response = {"version" : "1.0.0",
        "requested at" : str(datetime.now())}
    return response

@app.route('/user/<username>') 
def show_user(username): 
    return f'Hello {username} !'
   
@app.route("/hello") 
def hello(): 
    return "Hello, Welcome to my website"
    
@app.route("/signin") 
def index(): 
    return render_template("signin.html")

@app.route("/signup")
def signup():
    return render_template("signup-1.html")

@app.route("/signup-2")
def signup2():
    return render_template("signup-2.html")

@app.route("/signup-test")
def signup_test():
    print(request)
    body = request.json

    keys = list(body.keys())
    if "email" not in keys:
        return Response(json.dumps({"error" : "Invalid request. Email not sent"}),
                        status=400,
                        headers={"Content-Type":"application/json"})
    
    if "password" not in keys:
        return Response(json.dumps({"error" : "Invalid request. Password not sent"}),
                        status=400,
                        headers={"Content-Type":"application/json"})
    
    return Response({}, status=200, headers={"Content-Type":"application/json"})


if __name__ == "__main__": 
    app.run(debug=True, port=5005)