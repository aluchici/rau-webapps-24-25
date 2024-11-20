from datetime import datetime
import json
import os
from time import sleep
from flask import Flask, request, Response
from flask_cors import CORS

from entities import User 
from storage import connect

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/signin', methods=["GET", "POST"])
def signin():
    body=request.json
    keys=list(body.keys())
    if not "email" in keys:
        return Response(json.dumps({"error":"Invalid request. Email not sent"}),
                        status=400,
                        headers={"Content-Type":"application/json"})

    user=User()
    try:
        connection=connect()
        user.get_by_email(dbconnection=connection, email=body["email"])
        if user.password==body["password"]:
            response=Response(json.dumps({"data":{"id":user.id, "first_name":user.first_name}}),
                              status=200,
                              headers={"Content-Type":"application/json"})
        else:
            response=Response(json.dumps({"error":"User email or password are wrong."}),
                              status=400,
                              headers={"Content-Type":"application/json"})
    except Exception as e:
        response=Response(json.dumps({"error":"User missing."}),
                          status=404,
                          headers={"Content-Type":"application/json"})
    
    return response

@app.route("/signup",methods=["POST"])
def signup():
    body=request.json
    
    user=User()
    try:
        connection=connect()
        user.from_dict(body)
        user.get_by_email(dbconnection=connection,email=user.email)
        
        if user.id is not None:
            response=Response(json.dumps({"error":f"User already exists."},
                                         status=400,
                                         headers={"Content-Type":"application/json"}))
            return response
        
        user.is_active=1
        user.created_at=datetime.now().timestamp()
        user.updated_at=user.created_at
        connection=connect()
        user.insert(dbconnection=connection)
        
        user.get_by_email(dbconnection=connection,email=user.email)
        
        if user.id is None:
            response=Response(json.dumps({"error":"User not found after insert."}),
                              status=404,
                              headers={"Content-Type":"application/json"})
            return response
        
        response=Response(json.dumps({"data":{"id":user.id, "first_name":user.first_name}}),
                          status=200,
                          headers={"Content-Type":"application/json"})
        
    except Exception as e:
        print(e)
        response=Response(json.dumps({"error":f"Something went wrong. Cause: {e}."}),
                          status=400,
                          headers={"Content-Type":"application/json"})
        return response

if __name__ == '__main__':
    app.run(debug=True)