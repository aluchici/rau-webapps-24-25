const USERS = [
    {
        "email": "a@b.c",
        "password": "123"
    },
    {
        "email": "d@b.c",
        "password": "123"
    }, {
        "email": "e@b.c",
        "password": "123"
    }, {
        "email": "f@b.c",
        "password": "123"
    },
];


//1. Capture user input
//2. Check if user exists
//3. check if user credentials match provided details
//4. if match => go to home lese go to signin fail


const form = document.querySelector('form');
form.addEventListener('submit', signin);

function signin(e) {
    e.preventDefault();
    const errorParagraph = document.getElementById("errorMessage");
    errorParagraph.innerText = "";
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (email.value == "" || password.value == "") {
        return;
    }

    for (let user of USERS) {
        if (user.email == email.value) {
            if (user.password == password.value) {
                window.location.replace("home.html");
            }
        }
    }


    errorParagraph.innerHTML = "invalid user credentials";
    errorParagraph.style.color = 'red';

}