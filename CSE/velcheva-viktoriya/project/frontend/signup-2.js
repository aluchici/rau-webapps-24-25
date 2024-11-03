document.addEventListener('DOMContentLoaded', () => {
    const idUploadForm = document.getElementById('idUploadForm');

    if (idUploadForm) {
        idUploadForm.addEventListener('submit', handleIdUpload); // Attach handler to the upload form
    }
});

function handleIdUpload(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);

    fetch('http://127.0.0.1:5000/complete-signup', {
        method: 'POST',
        body: formData // Sending form data which includes the file
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to complete signup');
        }
        return response.json();
    })
    .then(data => {
        alert('Signup successful!');
        window.location.href = 'signin.html'; // Redirect to sign-in page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to complete signup: ' + error.message);
    });
}
