from flask import Flask, request, jsonify

app = Flask(__name__)

# Път към текстовия файл, в който ще записваме потребителите
USER_FILE = "users.txt"

def check_user_exists(username):
    """Проверка дали потребителското име вече съществува в users.txt"""
    try:
        with open(USER_FILE, 'r') as file:
            users = file.readlines()
            for user in users:
                if user.split(",")[0] == username:  # assuming format: username,password
                    return True
    except FileNotFoundError:
        pass  # Файлът не съществува, което е нормално при първоначално стартиране
    return False

def save_user(username, password):
    """Записва новия потребител в users.txt"""
    with open(USER_FILE, 'a') as file:
        file.write(f"{username},{password}\n")

@app.route('/register', methods=['POST'])
def register():
    """Регистрация на нов потребител"""
    # Вземаме данни от заявката
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Проверка дали потребителското име вече съществува
    if check_user_exists(username):
        return jsonify({"message": "Потребителското име вече съществува!"}), 400

    # Записване на новия потребител
    save_user(username, password)
    
    return jsonify({"message": "Регистрацията беше успешна!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
