from datetime import datetime
from datetime import timezone

from bson.objectid import ObjectId

class ProjectModel:
    def __init__(self, db):
        self.collection = db['projects']  # Replace with your collection name
        
    def get_projects_by_user(self, user_id):
        """Retrieve all projects for a specific user."""
        return list(self.collection.find({"user_id": ObjectId(user_id)}))

    def create_project(self, project_name, user_id): 
        """Create a new project."""
        if self.collection.find_one({"name": project_name}):
            raise ValueError("Project name is already in use")
        
        new_project = {
            "name": project_name,
            "user_id": ObjectId(user_id),
            "labelled_examples": 0,
            "total_examples": 0,
            "last_updated": datetime.now(timezone.utc)
        }

        project_id = self.collection.insert_one(new_project).inserted_id
        new_project["id"] = str(project_id) 
        new_project["user_id"] = user_id
        new_project["_id"] = str(new_project["_id"])
        return new_project