const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let users = []; // This is just an example; use a database in a real application.

app.post('/signup', (req, res) => {
    const { first_name, last_name, dob, gender, email, phone, password } = req.body;
    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create a new user
    const newUser = {
        first_name,
        last_name,
        dob,
        gender,
        email,
        phone,
        password // Make sure to hash passwords in a real app
    };
    users.push(newUser); // Save user
    res.json({ message: 'User registered successfully!' });
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    if (user.password !== password) { // Compare hashed passwords in a real app
        return res.status(401).json({ message: 'Incorrect password' });
    }
    
    res.json({ message: 'Login successful' });
});
