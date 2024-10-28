from flask import Flask, request, Response
from datetime import datetime

app = Flask("app")

@app.route("/", methods=["GET"])

def home():
    print("Hello")
    return "<h1>hello world</h1>"

@app.route("/version", methods=["GET"])

def version():
    return {
        "version": "1.0.0",
        "requested_at": str(datetime.now())
    }
    
@app.route("/signin", methods=["GET", "POST"])
def signin():
    #1. receive data
    print(request)
    body = request.json
    
    #2. validate data
    keys = list(body.keys())
    
    if not "email" in keys:
        return Response(json.dumps({"error":"invalid request. email not sent"}),
                        
                        )
    
    #3. check against the stored data
    #4. return a response based on the result obtained at 3.
    
    return Response({}, {"Content-Type": "application/json"}, 200)

if __name__ == "__main__":
    app.run(port=5001)  
    
