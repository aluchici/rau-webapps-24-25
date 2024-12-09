from bson.objectid import ObjectId

class ProjectModel:
    def __init__(self, db):
        self.collection = db['projects']  # Replace with your collection name
        
    def get_projects_by_user(self, user_id):
        """Retrieve all projects for a specific user."""
        return list(self.collection.find({"user_id": ObjectId(user_id)}))
