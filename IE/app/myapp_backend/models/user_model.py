from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel:
    def __init__(self, db):
        self.collection = db['users']  # Replace with your users collection name

    def create_user(self, email, password):
        """Create a new user with a hashed password."""
        if self.collection.find_one({"email": email}):
            raise ValueError("Email is already in use")
        hashed_password = generate_password_hash(password)
        user_id = self.collection.insert_one({"email": email, "password": hashed_password}).inserted_id
        return str(user_id)

    def find_user_by_email(self, email):
        """Find a user by email."""
        return self.collection.find_one({"email": email})

    def verify_user(self, email, password):
        """Verify user credentials."""
        user = self.find_user_by_email(email)
        if not user or not check_password_hash(user['password'], password):
            raise ValueError("Invalid email or password")
        return str(user['_id'])
