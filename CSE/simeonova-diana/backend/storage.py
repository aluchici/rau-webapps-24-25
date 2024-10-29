import sqlite3

def connect():
    return sqlite3.connect("D:\\web apps\\rau-webapps-24-25\\CSE\\simeonova-diana\\backend\\app.db")

connection = connect()

# Databse interaction example
# 1. create a query
query = """CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_NAME VARCHAR,
    last_name VARCHAR,
    dob VARCHAR,
    gender INTEGER,
    phone VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_active INTEGER
    )"""
# 2. add values to the query (depending on the situation)
# 3. run the query
# 3.1. create a cursor
cursor = connection.cursor()

# 3.2 use the cursor to run the query
cursor.execute(query)
# 4. commit the results (if you update the databse)
connection.commit()
# 5. close the cursor (optional, ideal)
cursor.close()
# 6. close the connection (optional, ideal)
connection.close()

# === CREATE TABLE FILES TABLE === #
query = """CREATE TABLE IF NOT EXISTS user_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaded_image_url VARCHAR,
    selfie_url VARCHAR,
    user_id INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
    );"""
    
connection = connect()
cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()