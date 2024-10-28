import sqlite3

def connect():
    return sqlite3.connect() 
connection = connect()
#database interaction example
#1. create a query (define)
query = """Create Table users (
id INTEGER PRIMARY KEY,
first name VARCHAR,
last_name VARCHAR,
dob TIMESTAMP
gender INTEGER
phone VARCHAR
email VARCHAR
password VARCHAR
created_at TIMESTAMP
updated_at TIMESTAMP
is_active INTEGER


);
"""