const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {
    const { first_name, last_name, dob, gender, email, phone, password } = req.body;
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const newUser = {
        first_name,
        last_name,
        dob,
        gender,
        email,
        phone,
        password
    };
    users.push(newUser);
    res.json({ message: 'User registered successfully!' });
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    
    res.json({ message: 'Login successful' });
});
