from datetime import datetime


class User:
    def __init__(self):
        self.id = None 
        self.first_name = None 
        self.last_name = None 
        self.dob = None
        self.gender = None 
        self.phone = None 
        self.email = None 
        self.password = None 
        self.created_at = None 
        self.updated_at = None 
    
    def is_password_valid(self):
        if self.password is None or len(self.password) < 8:
            return False 
        return True 
    
    def insert(self, dbconnection, table_name="users"):
        query = f"""
        INSERT INTO {table_name} (
            first_name, 
            last_name, 
            dob, 
            gender, 
            phone, 
            email, 
            password, 
            created_at, 
            updated_at
        ) 
        VALUES (
            '{self.first_name}', 
            '{self.last_name}', 
            {self.dob}, 
            {self.gender}, 
            '{self.phone}', 
            '{self.email}', 
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
        query = f"""SELECT * FROM {table_name} WHERE id = {self.id}""" 
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        dbconnection.close()
        return result 

    def update(self, dbconnection, table_name="users"):
        pass 

    def delete(self, dbconnection, table_name="users"):
        pass 


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
    user.last_name = "User 1 LN"
    user.email = "user1@email.com"
    user.phone = "+748777777"
    user.password = "123456789"
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