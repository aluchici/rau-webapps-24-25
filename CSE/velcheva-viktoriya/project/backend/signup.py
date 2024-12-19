from datetime import datetime
from flask import Flask, request, redirect, jsonify
from storage import connect  # Импорт на функцията за свързване с базата данни
from entities import User  # Импорт на User класа

app = Flask(__name__)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json  # Взимаме JSON данните от заявката

    # Създаваме нов User обект с въведените данни
    new_user = User()
    new_user.first_name = data.get("first_name")
    new_user.last_name = data.get("last_name")
    new_user.email = data.get("email")
    new_user.phone = data.get("phone")
    new_user.password = data.get("password")
    new_user.dob = data.get("dob")
    new_user.gender = data.get("gender")
    new_user.created_at = datetime.now().isoformat()
    new_user.updated_at = datetime.now().isoformat()
    new_user.is_active = 1

    # Проверка на валидността на паролата
    if not new_user.is_password_valid():
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    # Вмъкване на новия потребител в базата данни
    try:
        connection = connect()
        new_user.insert(connection)
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to register user"}), 500

if __name__ == "__main__":
    app.run(debug=True)
