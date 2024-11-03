document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('step1Form');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function handleSignup(event) {
    event.preventDefault();

    const userData = {
        first_name: document.getElementById('firstname').value,
        last_name: document.getElementById('lastname').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    window.location.href = 'signup-2.html?file=photo+(11).png';
    fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save user data');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = 'upload-id.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save user data: ' + error.message);
    });
}
