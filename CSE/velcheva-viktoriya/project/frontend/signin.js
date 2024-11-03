const USERS = [
    { email: "a@b.c", password: "1345678900" },
    { email: "d@b.c", password: "1345678901" },
    { email: "e@b.c", password: "1345678902" },
    { email: "f@b.c", password: "1345678903" },
];

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event) {
    event.preventDefault(); // Prevent default form submission
    signin(); // Call the signin function
}

function signin() {
    const errorParagraph = document.getElementById("errorMessage");
    errorParagraph.innerText = ""; // Clear previous error message

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        errorParagraph.innerText = "Please fill in both fields.";
        errorParagraph.style.color = "red";    
        return;
    }

    let userFound = false;

    for (let user of USERS) {
        if (user.email === email) {
            userFound = true; // User exists
            if (user.password === password) {
                window.location.replace("home.html"); // Redirect to home
                return; // Stop further execution
            } else {
                errorParagraph.innerText = "Invalid password. Please try again."; // Error message
                errorParagraph.style.color = "red";    
                return;
            }
        }
    }

    if (!userFound) {
        errorParagraph.innerText = "User does not exist. Please try again."; // Error message
        errorParagraph.style.color = "red";    
    }
}
