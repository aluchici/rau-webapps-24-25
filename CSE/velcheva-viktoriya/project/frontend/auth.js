// Temporary user storage
const users = [];

// Function to register a user
function signup(username, password, isAdmin) {
    const user = { username, password, isAdmin };
    users.push(user);
    console.log(`${username} has been registered as ${isAdmin ? 'Admin' : 'Regular User'}.`);
}

// Function to login a user
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        console.log(`${username} has logged in as ${user.isAdmin ? 'Admin' : 'Regular User'}.`);
        return user.isAdmin ? 'admin' : 'regular';
    } else {
        console.log('Login failed: Invalid username or password.');
        return null;
    }
}

// Example usage
signup('adminUser', 'adminPass', true); // Registering an admin
signup('regularUser', 'userPass', false); // Registering a regular user

login('adminUser', 'adminPass'); // Logging in as admin
login('regularUser', 'userPass'); // Logging in as regular user