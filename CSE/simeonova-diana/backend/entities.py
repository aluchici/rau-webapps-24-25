from datetime import datetime
import json
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
    # === VALIDATION === #
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
        updated_at,
        is_active
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
            {self.updated_at},
            {self.is_active}
        );"""
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
    # === Initilization and other utils of helper methods === #
    def from_tuple(self, user_tuple):
        #prevention from returning an empty tuple
        assert len(user_tuple) == 11 #check for the exact num of fields
        self.id = user_tuple[0]
        self.first_name = user_tuple[1]
        self.last_name = user_tuple[2]
        self.dob = user_tuple[3]
        self.gender = user_tuple[4]
        self.phone = user_tuple[5]
        self.email = user_tuple[6]
        self.password = user_tuple[7]
        self.created_at = user_tuple[8]
        self.updated_at = user_tuple[9]
        self.is_active = user_tuple[10]
        return self
    
    def from_dict(self, user_dict):
        self.id = user_dict.get("id")
        self.first_name = user_dict["first_name"]
        self.last_name = user_dict["last_name"]
        self.dob = user_dict["dob"]
        self.gender = user_dict["gender"]
        self.phone = user_dict["phone"]
        self.email = user_dict["email"]
        self.password = user_dict["password"]
        self.created_at = user_dict.get("created_at")
        self.updated_at = user_dict.get("updated_at")
        self.is_active = user_dict.get("is_active")
        return self
    
    def from_json(self, user_json):
        user_dict = json.loads(user_json)
        return self.from_dict(user_dict)
    
    def to_dict(self):
        user_dict = {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob,
            "gender": self.gender,
            "phone": self.phone,
            "email": self.email,
           #"password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_active": self.is_active,
            "is_password_valid": self.is_password_valid()
        }
        return user_dict
    
    def to_json(self):
        return json.dumps(self.to_dict())
    
    # === CRUD operations (interaction with DB) === #
    
    def get(self, dbconnection, table_name="users"):
        query = f"""
            SELECT * FROM {table_name} WHERE id = {self.id}
        """
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        
        self.from_tuple(result) #initliaze it with a tuple, return a copy 
        return self
    
    def get_by_email(self, dbconnection, table_name="users"):
        assert user is not None
        query = f"""SELECT * FROM {table_name} WHERE email = '{user.email}'""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        self.from_tuple(result)
        return self 
    
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
        
    def insert(self, dbconnection, table_name="user_files"):
        query = f"""INSERT INTO {table_name} (
        uploaded_image_url,
        selfie_url,
        user_id,
        created_at, 
        updated_at
        )
        VALUES (
            '{self.uploaded_image_url}',
            '{self.selfie_url}',
            {self.user_id},
            {self.created_at},
            {self.updated_at}
        );"""
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
        
    def from_tuple(self, user_files_tuple):
        self.id = user_files_tuple[0]
        self.uploaded_image_url = user_files_tuple[1]
        self.selfie_url = user_files_tuple[2]
        self.user_id = user_files_tuple[3]
        self.created_at = user_files_tuple[4]
        self.updated_at = user_files_tuple[5]
        return self
    
    def from_dict(self, user_files_tuple):
        self.id = user_files_tuple["id"]
        self.uploaded_image_url = user_files_tuple["uploaded_image_urle"]
        self.selfie_url = user_files_tuple["selfie_url"]
        self.user_id = user_files_tuple["user_id"]
        self.created_at = user_files_tuple["created_at"]
        self.updated_at = user_files_tuple["updated_at"]
        return self
    
    def from_json(self, user_files_json):
        user_files_dict = json.loads(user_files_json)
        return self.from_dict(user_files_dict)
    
    def to_dict(self):
        user_files_dict = {
            "id": self.id,
            "uploaded_image_url": self.uploaded_image_url,
            "selfie_url": self.selfie_url,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
        return user_files_dict
    
    def to_json(self):
        return json.dumps(self.to_dict())
    
    def get(self, dbconnection, table_name="user_files"):
        query = f"""
            SELECT * FROM {table_name} WHERE id = {self.id}
        """
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        self.from_tuple(result)
        return self
    def get_by_user_id(self, dbconnection, table_name="user_files", user_id=None):
        assert user_id is not None # Check that a valid user id is provided.
        query = f"""SELECT * FROM {table_name} WHERE user_id = {user_id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        dbconnection.close()
        return result 
    
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
    user.is_active = 0
    
    # connection = connect()
    # user.insert(connection)
    
    # connection = connect()
    # user.id = 1
    # u = user.get(connection)
    # print(u)
    
    # print(u.to_dict())
    # print(u.to_json())
    
    
    
    # user.first_name = "steak"
    # connection = connect()
    # user.update(connection)
    # connection = connect()
    # u = user.get(connection)
    # print(u)
    
    
    # connection = connect()
    # u = user.delete_all(connection)
    # print(u)
    
    # connection = connect()
    # u = user.get(connection)
    # print(u)
    
    # connection = connect()
    # user.delete(connection)
    
    user_file = UserFile()
    user_file.id = 1
    user_file.uploaded_image_url = "file:///D:/Downloads/435475633_1114328639686497_3865527573417141800_n.jpg"
    user_file.selfie_url = 12
    user_file.user_id = 1
    user_file.created_at = datetime.now().timestamp()
    user_file.updated_at = datetime.now().timestamp()
    
    connection = connect()
    user_file.insert(connection)
    
    connection = connect()
    user_file.id = 1
    u_f = user_file.get(connection)
    print(u_f)
    
    print(u_f.to_dict())
    print(u_f.to_json())