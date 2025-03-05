import os
from pymongo import MongoClient

MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/chemtools')

def get_db_connection():
    client = MongoClient(MONGO_URI)
    db = client.get_database()
    return db