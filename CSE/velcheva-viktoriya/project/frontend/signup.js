// Function to handle camera access and display the video feed
async function signupStep2(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const takePhotoButton = document.getElementById('takePhotoButton');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        takePhotoButton.style.display = 'block';
    } catch (err) {
        console.error('Error accessing the camera:', err);
        alert('Cannot access the camera. Please allow camera access or try another device.');
    }
}

// Function to take a photo from the video stream
function takePhoto(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show the captured image
    canvas.style.display = 'block';  // Display the canvas with the image
    video.style.display = 'none';     // Hide the video feed

    // Add flash effect
    const flash = document.getElementById('flash');
    flash.style.display = 'block'; // Show flash
    setTimeout(() => {
        flash.style.display = 'none'; // Hide flash after 200ms
    }, 200);
}

// Function to update the file name label
function updateFileName() {
    const fileInput = document.getElementById('upload_id');
    const fileLabel = document.getElementById('fileLabel');

    fileLabel.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'Choose a file';
}

// Add event listener to the signup form
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('step1Form');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup); // Attach handler to the signup form
    }
});

function handleSignup(event) {
    event.preventDefault(); // Prevent form submission

    // Gather input values
    const userData = {
        first_name: document.getElementById('firstname').value,
        last_name: document.getElementById('lastname').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    // Send the data to the server
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
        window.location.href = 'upload-id.html'; // Redirect to the ID upload page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save user data: ' + error.message);
    });
}
