document.addEventListener('DOMContentLoaded', () => {
    const accessCameraButton = document.getElementById('accessCameraButton');
    accessCameraButton.addEventListener('click', signupStep2);

    const fileInput = document.getElementById('upload_id');
    fileInput.addEventListener('change', updateFileName);
    
    const takePhotoButton = document.getElementById('takePhotoButton');
    takePhotoButton.addEventListener('click', takePhoto);
});

let photoTaken = false;
let stream;

async function signupStep2(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const takePhotoButton = document.getElementById('takePhotoButton');

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

    photoTaken = true;
    const takePhotoButton = document.getElementById('takePhotoButton');
    takePhotoButton.textContent = 'Retake a picture';
}

function retakePhoto(event) {
    event.preventDefault();

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');

    canvas.style.display = 'none';
    video.style.display = 'block';

    const takePhotoButton = document.getElementById('takePhotoButton');
    takePhotoButton.textContent = 'Take a picture';

    photoTaken = false;
}

const takePhotoButton = document.getElementById('takePhotoButton');
takePhotoButton.addEventListener('click', function(event) {
    if (photoTaken) {
        retakePhoto(event);
    } else {
        takePhoto(event);
    }
});

function handleIdUpload(event) {
    event.preventDefault();

    const fileInput = document.getElementById('upload_id');
    
    if (!photoTaken) {
        alert("Please take a photo before continuing.");
        return;
    }

    const fileUploaded = fileInput.files.length > 0;

    if (!fileUploaded) {
        alert("Please upload an ID picture before continuing.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const canvas = document.getElementById('canvas');
    canvas.toBlob((blob) => {
        formData.append('photo', blob, 'photo.png');

        fetch('http://127.0.0.1:5001/complete-signup', {
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
    }, 'image/png');
}

function updateFileName() {
    const fileInput = document.getElementById('upload_id');
    const fileLabel = document.getElementById('fileLabel');

    fileLabel.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'Choose an ID picture';
}
