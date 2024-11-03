document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        alert("No signup data found. Please complete the signup form first.");
        window.location.href = 'signup.html';
        return;
    }
});

function handleCompleteSignup() {
    const canvas = document.getElementById('canvas');
    const imageDataUrl = canvas.toDataURL();
    const fileInput = document.getElementById('upload_id');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        userData.profileImage = URL.createObjectURL(file);
    } else {
        userData.profileImage = imageDataUrl;
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Profile created successfully!');
    window.location.href = 'signin.html';
}


async function signupStep2(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const takePhotoButton = document.getElementById('takePhotoButton');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        takePhotoButton.style.display = 'block';
        console.log("Camera access granted.");
    } catch (err) {
        console.error('Error accessing the camera:', err);
        alert('Cannot access the camera. Please allow camera access or try another device.');
    }
}

function takePhoto(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.style.display = 'block';
    video.style.display = 'none';

    const flash = document.getElementById('flash');
    flash.style.display = 'block';
    setTimeout(() => {
        flash.style.display = 'none';
    }, 200);
}

function updateFileName() {
    const fileInput = document.getElementById('upload_id');
    const fileLabel = document.getElementById('fileLabel');

    fileLabel.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'Choose a file';
}

function handleIdUpload(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('http://127.0.0.1:5000/complete-signup', {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to complete signup');
        }
        return response.json();
    })
    .then(data => {
        alert('Signup successful!');
        window.location.href = 'signin.html'; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to complete signup: ' + error.message);
    });
}
