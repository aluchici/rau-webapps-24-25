let user = window.localStorage.getItem('user');
if (!user) {
    user = {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        dob: undefined,
        gender: undefined,
        created_at: undefined,
        updated_at: undefined,
        is_active: undefined
    }
} else {
    user = JSON.parse(user);
}
function signupStep1() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    if (password.value == "" || (password.value != confirmPassword.value)) {
        console.log("passwords are different");
        return;
    }

    const terms = document.getElementById('terms');
    if (!terms.checked) {
        console.log("terms policies must be agreed upon");
        return;
    }
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) {
        console.log("privacy policies must be agreed upon");
        return;
    }
    
    user.first_name = document.getElementById('firstname').value;
    user.last_name = document.getElementById('lastname').value;
    user.email = document.getElementById('email').value;
    user.phone = document.getElementById('phone').value;
    user.password = password.value;
    
    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    user.dob = new Date(dob.value).getTime();
    user.gender = parseInt(gender.value);
    // user.is_active = 1;

    //fetch(url, options).then().then().catch()

    const url = "http://localhost:5001/signup";
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

    window.localStorage.setItem('user', JSON.stringify(user));
//     window.location.replace("signup-2.html");
}

function signupStep2() {
   
}

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event) {
    event.preventDefault();
    // actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}


function getData() {
    // fetch(url, options).then(f(x)).then(g(x)).catch(h(x))
    const url = "http://localhost:5001/version"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url)
    .then(responseArrived)
    .then(responseBodyRecieved)
    .catch(errorHappened);
    console.log("Hello!!");
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