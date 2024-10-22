class User {
    constructor(firstname, lastname, dob, gender, email, phone, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.password = password; 
    }

    greet() {
        console.log(`Hello, my name is ${this.firstname}`);
    }
}

const users = [];

// Load users from localStorage when the application starts
function loadUsers() {
    const usersData = localStorage.getItem("users");
    if (usersData) {
        const parsedUsers = JSON.parse(usersData);
        parsedUsers.forEach(user => users.push(new User(user.firstname, user.lastname, user.dob, user.gender, user.email, user.phone, user.password)));
    }
}

// Save users to localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function signupstep1() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    if (password === confirm_password) {
        // Store user data in localStorage
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("dob", dob);
        localStorage.setItem("gender", gender);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("password", password); // Should be stored as hash

        window.location.replace("/signup-2");
    } else {
        console.error("Passwords do not match.");
        alert("Passwords do not match. Please try again.");
    }
}

function signupstep2() {
    console.log("Sign up step 2.");

    // Retrieve stored values
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");
    const dob = localStorage.getItem("dob");
    const gender = localStorage.getItem("gender");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const password = localStorage.getItem("password");

    if (firstname && lastname && dob && gender && email && phone && password) {
        users.push(new User(firstname, lastname, dob, gender, email, phone, password))
        saveUsers();
        console.log(users);
        outpuallusers();
    } else {
        console.log("Parameters cannot be null.")
    }

}

function outpuallusers() {
    // Example implementation (you can modify as needed)
    console.log("All users:");
    users.forEach(user => {
        console.log(user.greet());
    });
}

// Call loadUsers on application start
loadUsers();
outpuallusers()



