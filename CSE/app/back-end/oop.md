The app allows users to create an account. To register, the user should provide the following information: email, password. The user also has to enter the password again to confirm it. The password needs to be at least 8 characters.

Users can add other users to their friends list. A user can send messages to their friends.

The system needs to know when a user was last seen online 

Address
- street
- no
- city 
- postcode 
- country 

User 
- email 
- password
- friends_list
- last_active 
- address: List[Address]

> add()
> send_message()
> is_password_valid()