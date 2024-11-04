import sqlite3

def connect():
    return sqlite3.connect("D:\\web apps\\rau-webapps-24-25\\CSE\\simeonova-diana\\back-end\\app.db")
    # return sqlite3.connect("D:\\LUCHICI\\24-25 - CSE - A3 - Web Applications Programming\\rau-webapps-24-25\\CSE\\app\\back-end\\app.db")

connection = connect()

# Database interaction example
# 1. create a query (define)
query = """CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    dob TIMESTAMP,
    gender INTEGER,
    phone VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_active INTEGER
);
"""

# 2. add values to the query (depending on the situation)

# 3. run the query 
# 3.1. create a cursor 
cursor = connection.cursor()

# 3.2. use the cursor to run the query 
cursor.execute(query)

# 4. commit the results (if you update the database)
connection.commit()

# 5. close cursor (optional, ideal)
cursor.close() 

# 6. close connection (optional, ideal)
connection.close()

# === CREATE USER FILES TABLE === #
query = """CREATE TABLE IF NOT EXISTS user_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaded_image_url VARCHAR,
    selfie_url VARCHAR,
    user_id INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
"""
connection = connect()
cursor = connection.cursor()
cursor.execute(query)
connection.commit()
cursor.close()
connection.close()
