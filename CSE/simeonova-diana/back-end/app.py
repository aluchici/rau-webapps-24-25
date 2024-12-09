from datetime import datetime
import json
from flask import Flask, request, Response
from flask_cors import CORS

from entities import User 
from storage import connect 

app = Flask("app")
CORS(app, 
     resources={
         r"/*": {"origins": "*"}
        #  r"/signup": {
        #      "origins": "https://myapp.com"
        #  }
        }
    )

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
    connection = connect()
    body = request.json
    print(body)

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
    # 3.1. get the user data based on the provided email
    # 3.2. if they exist => check that the user password matches the provided password
    # 3.3. if they match => we let them in 
    user = User()
    try:
        user.get_by_email(dbconnection=connection, email=body["email"])
        if user.password == body["password"]:
            response = Response(json.dumps({"data": {"id": user.id, "first_name": user.first_name}}),
                                status=200,
                                headers={"Content-Type": "application/json"})
        else:
            response = Response(json.dumps({"error": "User email or password are wrong."}), 
                                status=400, 
                                headers={"Content-Type": "application/json"})
    except Exception as e:
        response = Response(json.dumps({"error": "User missing."}), 
                            status=404, 
                            headers={"Content-Type": "application/json"})
    
    # 4. return a response based on the result obtained at 3. 
    return response


@app.route("/signup", methods=["POST"])
def signup():
    body = request.json
    
    user = User()
    try:
        connection = connect()
        user.from_dict(body)
        user.get_by_email(dbconnection=connection, email=user.email)
        if user.id is not None:
            response = Response(json.dumps({"error": f"User already exists."}),
                                status=400,
                                headers={"Content-Type": "application/json"})
            return response
        
        user.is_active = 1
        user.created_at = datetime.now().timestamp()
        user.updated_at = user.created_at
        connection = connect()
        user.insert(dbconnection=connection)

        connection = connect()        
        user.get_by_email(dbconnection=connection, email=user.email)
        response = Response(json.dumps({"data": {"id": user.id, "first_name": user.first_name}}),
                                status=200,
                                headers={"Content-Type": "application/json"})
    except Exception as e:
        print(e)
        response = Response(json.dumps({"error": f"Something went wrong. Cause: {e}."}),
                            status=400,
                            headers={"Content-Type": "application/json"})
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5001)
