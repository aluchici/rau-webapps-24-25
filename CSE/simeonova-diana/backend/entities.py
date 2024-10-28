from datetime import datetime
from sqlite3 import connect


class User:
    def __init__(self):
        self.id = None
        self.first_name = None
        self.last_name = None
        self.email = None
        self.dob = None
        self.phone = None
        self.password = None
        self.gender = None
        self.created_at = None
        self.updated_at = None
        self.is_active = None
    
    def is_password_valid(self):
        if self.password is None or len(self.password) < 8:
            return False
        return True

    def insert(self, dbconnection, table_name="users"):
        query = f"""INSERT INTO {table_name} (first_name, 
        last_name, 
        email, 
        dob, 
        gender, 
        phone, 
        password, 
        created_at, 
        updated_at
        )
        VALUES (
            '{self.first_name}',
            '{self.last_name}', 
            '{self.email}', 
            {self.dob}, 
            {self.gender}, 
            '{self.phone}', 
            '{self.password}', 
            {self.created_at}, 
            {self.updated_at}
        );"""
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
    def get(self, dbconnection, table_name="users"):
        query = f"""
            SELECT * FROM {table_name} WHERE id = {self.id}
        """
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        dbconnection.close()
        return result
    
    def update(self, dbconnection, table_name="users"):
        query = f"""UPDATE {table_name}
        SET first_name = '{self.first_name}', 
            last_name = '{self.last_name}', 
            dob = {self.dob}, 
            gender = {self.gender}, 
            phone = '{self.phone}', 
            email = '{self.email}', 
            password = '{self.password}', 
            created_at = {self.created_at}, 
            updated_at =  {self.updated_at}
        WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
       # result = cursor.fetchall()
        cursor.close()
        dbconnection.close()
       # return result
    
    def delete(self, dbconnection, table_name="users"):
        query = f"DELETE FROM {table_name} WHERE id = {self.id}"
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        
    def delete_all(self, dbconnection, table_name="users"):
        query = f"DELETE FROM {table_name}"
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()

class UserFile:
    def __init__(self):
        self.id = None
        self.uploaded_image_url = None
        self.selfie_url = None
        self.user_id = None
        self.created_at = None
        self.updated_at = None
        
    def insert(self):
        pass
    
    def get(self):
        pass
    
    def update(self):
        pass
    
    def delete(self):
        pass
    
    
if __name__ == "__main__":
    from storage import connect
    user = User()
    user.first_name = "User 1 FN"
    user.last_name = "User 2 LN"
    user.email = "user1@example.com"
    user.phone = "+74877770"
    user.password = "password"
    user.created_at = datetime.now().timestamp()
    user.updated_at = datetime.now().timestamp()
    user.dob = datetime.now().timestamp()
    user.gender = 0
    
    connection = connect()
    user.insert(connection)
    
    connection = connect()
    user.id = 1
    u = user.get(connection)
    print(u)
    
    user.first_name = "steak"
    connection = connect()
    user.update(connection)
    connection = connect()
    u = user.get(connection)
    print(u)
    
    
    connection = connect()
    u = user.delete_all(connection)
    print(u)
    
    connection = connect()
    u = user.get(connection)
    print(u)
    
    # connection = connect()
    # user.delete(connection)