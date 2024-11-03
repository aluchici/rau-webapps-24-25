const users = [];

function signup(username, password, isAdmin) {
    const user = { username, password, isAdmin };
    users.push(user);
    console.log(`${username} has been registered as ${isAdmin ? 'Admin' : 'Regular User'}.`);
}

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

signup('adminUser', 'adminPass', true);
signup('regularUser', 'userPass', false);

login('adminUser', 'adminPass');
login('regularUser', 'userPass');