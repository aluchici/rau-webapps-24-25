import os 
from pymongo import MongoClient
from dotenv import load_dotenv 
import json 

config = json.loads("config.json")
load_dotenv() 

def get_database():
    # Replace this with your MongoDB URI
    MONGO_URI = f"mongodb+srv://{os.environ['MONGO_USER']}:{os.environ['MONGO_PASS']}@{config['database_url']}"
    client = MongoClient(MONGO_URI)
    db = client['text_labeling_app']  # Replace with your database name
    return db
