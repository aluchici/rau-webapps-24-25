const USERS = [
    {
        "email": "a@b.c",
        "password": "12345678900"
    },
    {
        "email": "d@b.c",
        "password": "12345678901"
    },
    {
        "email": "p@b.c",
        "password": "12345678902"
    },
    {
        "email": "f@g.k",
        "password": "12345678903"
    },
];

//1. Capture user input
//2. Check if user exists
//3. Check if user credentials match provided details
//4. If match => go to home else go to sing up fail

function signin() {
    const errorParagraph=document.getElementById("errorMessage");
    errorParagraph.innerText="";

    const email=document.getElementById("email");
    const password=document.getElementById("password");

    if(email.value=="" || password.value==""){
        return;
    }

    for (let user of USERS){
        if(user.email==email.value){
            if(user.password==password.value){
                window.location.replace("home.html");
            }
        }
    }

    errorParagraph.innerText="Invalid user credentials.";
    errorParagraph.style.color="red";
}

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event){
    event.preventDefault();
    //actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}