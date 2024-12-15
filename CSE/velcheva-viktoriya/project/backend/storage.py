import sqlite3

def connect():
    return sqlite3.connect("D:\\ERASMUS\\Web Applications Programming\\RAU-webapps-24-25\\rau-webapps-24-25-vv\\CSE\\velcheva-viktoriya\\project\\backend\\app.db")

connection = connect()

# Създаване на таблица 'users'
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
    is_active INTEGER,
    is_admin INTEGER DEFAULT 1
);"""

# Създаване на таблица 'books'
query_books = """CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    created_at DATETIME NOT NULL
);"""

# Създаване на таблица 'user_files'
query_files = """CREATE TABLE IF NOT EXISTS user_files(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaded_image_url VARCHAR,
    selfie_url VARCHAR,
    user_id INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);"""

try:
    cursor = connection.cursor()
    # Изпълняване на SQL заявките
    cursor.execute(query)
    cursor.execute(query_books)
    cursor.execute(query_files)
    
    # Потвърждаване на промените
    connection.commit()

except sqlite3.Error as e:
    print(f"Error occurred: {e}")

finally:
    # Затваряне на курсора и връзката
    cursor.close()
    connection.close()
