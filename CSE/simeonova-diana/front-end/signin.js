const USERS = [
    {
        "email": "a@b.c",
        "password": "1345678900"
    },
    {
        "email": "d@b.c",
        "password": "1345678901"
    },
    {
        "email": "e@b.c",
        "password": "1345678902"
    },
    {
        "email": "f@b.c",
        "password": "1345678903"
    },
];
// 1. Capture user input 
// 2. Check if user exists 
// 3. Check if user credentials match provided details
// 4. If match => go to home else display a message.
function signin() {
    const errorParagraph = document.getElementById("errorMessage");
    errorParagraph.innerText = "";
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (email.value == "" || password.value == "") {
        return;
    }
    
    const user = {
        "email": email.value,
        "password": password.value
    }
    
    const url = "http://localhost:5001/signin";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    fetch(url, options)
    .then(responseArrived)
    .then(responseBodyRecieved)
    .catch(errorHappened);

    // errorParagraph.innerText = "Invalid user credentials.";
    // errorParagraph.style.color = "red"; 
}


const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event) {
    event.preventDefault();
    // actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}
function responseBodyRecieved(response) {
    console.log(response);
    
}

function responseArrived(response) {
    console.log("Success!!!");
    console.log(response);
    if (!response.ok) {
        throw new Error("failed to get data");
    }
    return response.json();
}

function errorHappened(response) {
    console.log("Error!!!");
    console.log(response);
}