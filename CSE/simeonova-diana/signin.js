const USERS = [
    {
        "email": "a@b.c",
        "password": "12345796"
    },
    {
        "email": "d@e.c",
        "password": "adafra1"
    },
    {
        "email": "f@a.c",
        "password": "aVEdzsv0"
    },
    {
        "email": "u@n.c",
        "password": "ihgmndgz4"
    }
];

//1. catch user input
//2. check if user exists
//3.check if credential match provided details
//4. if match => go to home or display error
function signin(e) {
    e.preventDefault
    const errorParagraph = document.getElementById('error');
    errorParagraph.style.display= "none";
    
    console.log("signin");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email == "" || password == "") {
        return;
    }

    for(let user of USERS) {
        if(user.email == email) {
            if(user.password == password) {
                window.location.replace("index.html");
            } else {
                errorParagraph.style.display= "inline-block";
            }
        } else {
            errorParagraph.style.display= "inline-block";
            console.log("Invalid email");
        }
    }

    
}

// const form = document.querySelector('form');
// form.addEventListener('submit', event => {
//     event.preventDefault();
//     console.log("form submission cancelled");
// })