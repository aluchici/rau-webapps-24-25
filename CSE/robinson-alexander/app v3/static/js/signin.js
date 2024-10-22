const USERS = [
    {
        "email":"a@b.c",
        "password":"123456"
    },
    {
        "email":"b@b.c",
        "password":"12345678"
    },
    {
        "email":"c@b.c",
        "password":"12345678910"
    },
];

/*
1. Capture user input
2. Check if user exists 
3. Check if user credentials match provided details
4. If match => go to home else go to signup-fail.html
*/

function signin(){
    console.log("Sign in.")
    const errorParagraph = document.getElementById("errorMessage")
    errorParagraph.innerText = "";
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if( email.value == "" || password.value == ""){
        return;
    }

    for (let user of USERS){
        // console.log(user);
        if (user.email == email.value){
            if (user.password == password.value){
                window.location.replace("home.html")
            }
        }
    }

    
    errorParagraph.innerText = "Invalid user credentials";
    errorParagraph.style.color = "red";
}



