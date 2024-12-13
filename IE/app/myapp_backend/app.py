import traceback
from flask import Flask, jsonify, request
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId
from database import get_database
from models.project_model import ProjectModel
from models.user_model import UserModel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize database and model
db = get_database()
project_model = ProjectModel(db)
user_model = UserModel(db)

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        # Use the UserModel to create a new user
        user_id = user_model.create_user(email, password)
        return jsonify({"success": True, "user_id": user_id}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/auth/signin', methods=['POST'])
def signin():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        # Use the UserModel to verify credentials
        user_id = user_model.verify_user(email, password)
        return jsonify({"success": True, "user_id": user_id}), 200

    except ValueError as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/api/projects', methods=['GET', 'POST'])
def get_projects():
    if request.method == "GET":
        user_id = request.args.get('user_id')

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        try:
            projects = project_model.get_projects_by_user(user_id)
            # Transform ObjectId to string for JSON serialization
            projects = [
                {
                    "id": str(project["_id"]),
                    "name": project["name"],
                    "lastUpdated": project["last_updated"],
                    "labelledExamples": project.get("labelled_examples", 0),
                    "totalExamples": project.get("total_examples", 0)
                }
                for project in projects
            ]
            return jsonify(projects), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    if request.method == "POST": 
        body = request.json 
        project_name = body.get("name", "Undefined")
        user_id = body.get("user_id")
        if user_id is None:
            return jsonify({"error": "Missing user ID"}), 400

        try:
            new_project = project_model.create_project(project_name, user_id)
            new_project = {
                "id": str(new_project["_id"]),
                "name": new_project["name"],
                "lastUpdated": new_project["last_updated"],
                "labelledExamples": new_project.get("labelled_examples", 0),
                "totalExamples": new_project.get("total_examples", 0)
            }
            return jsonify(new_project), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route('/api/projects/<project_id>/entries', methods=['GET'])
def get_project_entries(project_id):
    try:
        entries = list(
            db['entries'].find({"project_id": ObjectId(project_id)})
        )
        # Transform ObjectId to string for JSON serialization
        entries = [
            {
                "id": str(entry["_id"]),
                "text": entry["text"],
                "label": entry.get("label", "")
            }
            for entry in entries
        ]
        return jsonify(entries), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/projects/<project_id>/entries', methods=['PUT'])
def update_project_entries(project_id):
    try:
        data = request.json
        changes = data.get("changes", [])
        
        for change in changes:
            row_id = change["id"]
            label = change["label"]
            db['entries'].update_one(
                {"_id": ObjectId(row_id)},
                {"$set": {"label": label}}
            )

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
