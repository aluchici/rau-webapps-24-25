

let user = window.localStorage.getItem("user");
if (!user) {
    user = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        dob: undefined,
        gender: undefined,
        phone: undefined
    };
} else {
    user = JSON.parse(user);
}

function signupStep1() {
    // Form validation.
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    if (password.value == "" || (password.value != confirmPassword.value)) {
        console.log("Passwords are different.");
        return;
    }

    const terms = document.getElementById("terms");
    if (!terms.checked) {
        console.log("Terms not checked");
        return;
    }

    const privacy = document.getElementById("privacy");
    if (!privacy.checked) {
        console.log("Privacy not checked");
        return;
    }

    // Form is valid, we can move to next step 
    user.firstName = document.getElementById("firstname").value;
    user.lastName = document.getElementById("lastname").value;
    user.phone = document.getElementById("phone").value;
    user.email = document.getElementById("email").value;
    user.password = password.value;

    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");
    user.dob = dob.value;
    user.gender = gender.value;

    window.localStorage.setItem("user", JSON.stringify(user));
    window.location.replace("signup-2.html");
}

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event) {
    event.preventDefault();
    // actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}