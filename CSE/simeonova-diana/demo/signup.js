let user = window.localStorage.getItem('user');
if (!user) {
    user = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        dob: undefined,
        gender: undefined
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

    user.firstName = document.getElementById('firstname').value;
    user.lastName = document.getElementById('lastname').value;
    user.email = document.getElementById('email').value;
    user.phone = document.getElementById('phone').value;

    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    user.dob = dob.value;
    user.gender = gender.value;

    window.localStorage.setItem('user', JSON.stringify(user));
    window.location.replace("signup-2.html");
}

function signupStep2() {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');
    const takePhotoButton = document.getElementById('takePhotoButton');
    const overlay = document.getElementById('overlay');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    startCameraButton.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            overlay.style.display = 'none';
            takePhotoButton.style.display = 'block';
        } catch (err) {
            console.error('Error accessing the camera: ', err);
        }
    });

    takePhotoButton.addEventListener('click', (event) => {
        event.preventDefault();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'photo.png';
        link.click();
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event) {
    event.preventDefault();
    // actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}