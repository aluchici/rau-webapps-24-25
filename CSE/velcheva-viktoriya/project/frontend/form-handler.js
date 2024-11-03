document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('step1Form');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function handleSignup(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const userData = {
        first_name: firstName,
        last_name: lastName,
        dob: dob,
        gender: gender,
        email: email,
        phone: phone,
        password: password
    };

    fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = 'signin.html';
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Signup failed: ' + error.message);
    });
}
