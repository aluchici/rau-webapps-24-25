from datetime import datetime
from sqlite3 import connect


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
        self.is_active = None
        
    def validate_password(self):
        if self.password is None or len(self.password) < 8:
            return False
        return True
    
    def insert(self, dbconnection, table_name="users"):
        query = f"""
        INSERT INTO {table_name} (first_name,
        last_name,
        dob,
        gender,
        phone,
        email,
        password,
        created_at,
        updated_at)
        
        VALUES ('{self.first_name}',
        '{self.last_name}',
        {self.dob}, 
        {self.gender},
        '{self.phone}',
        '{self.email}',
        '{self.password}',
        {self.created_at},
        {self.updated_at});
        """
        cursor = dbconnection.cursor()
        cursor.execute(query)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
    
    def get(self,dbconnection, table_name="users"):
        query = f"""
        SELECT * FROM {table_name} WHERE id = {self.id}
        """
        cursor = dbconnection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        
        print(result)
        dbconnection.commit()
        cursor.close()
        dbconnection.close()
    
    def update(self, dbconnection, table_name="users"):
        pass
    
    def delete(self, dbconnection, table_name="users"):
        pass
    

class UserFiles:
    def __init__(self):
        self.id = None
        self.uploaded_image_url = None
        self.selfie_url = None
        self.user_id = None
        self.created_at = None
        self.updated_at = None
        
    def insert(self, dbconnection, table_name="users"):
        pass
    
    def get(self,dbconnection, table_name="users"):
        pass
    
    def update(self, dbconnection, table_name="users"):
        pass
    
    def delete(self, dbconnection, table_name="users"):
        pass
    
    
    
if __name__ == "__main__":
    from storage import connect
    user = User()
    user.first_name = "malcho"
    user.last_name = "malchov"
    user.dob = datetime.now().timestamp()
    user.gender = 0
    user.phone = "+63276726"
    user.email = "malcho@gmail.com"
    user.password = "12345678"
    user.created_at = datetime.now().timestamp()
    user.updated_at = datetime.now().timestamp()
    
    connection = connect()
    user.insert(connection)
    
    connection = connect()
    user.id = 1
    u = user.get(connection)
    print(u)
    