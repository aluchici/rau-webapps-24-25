let user = localStorage.getItem('user');

if (!user) {
    const user = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        dob: undefined,
        gender: undefined,
        phone: undefined
    };
} else {
    user = JSON.parse();
}



const form = document.getElementById('step1form');
if (form) {
    form.addEventListener('submit', signupStep1);
}



// function stopFormDefault(event) {
//     event.preventDefault();
//     // actual logic, e.g. validate the form
//     console.log('Form submission cancelled.');
// }

function signupStep1(e) {
    e.preventDefault();
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');

    if (password.value == "" || password.value != confirmPassword.value) {
        console.log("passwords are different");
        return;
    }

    const terms = document.getElementById('terms');
    const privacy = document.getElementById('privacy');

    if (!terms.checked) {
        console.log('Terms not checked');
        return;
    }

    if (!privacy.checked) {
        console.log('privacy not checked!');
        return;
    }

    user.firstName = document.getElementById('firstname').value;
    user.lastName = document.getElementById('lastname').value;
    const dob = document.getElementById('dob');
    user.dob = dob.value;
    user.email = document.getElementById('email').value;
    user.password = password.value;
    const gender = document.getElementById('gender');
    user.gender = gender.value;
    user.phone = document.getElementById('phone').value;

    console.log(user)

    localStorage.setItem('user', JSON.stringify(user));

    //window.location.replace('signup-2.html');

    

   

}