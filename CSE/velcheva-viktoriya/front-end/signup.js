// const user = {
//     fistName: undefined,
//     lastName: undefined,
//     email: undefined,
//     password: undefined,
//     dob: undefined,
//     gender: undefined,
//     phone: undefined
// };

let user=window.localStorage.getItem("user");
if(!user){
    user = {
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        created_at: undefined,
        updated_at: undefined,
        is_active: undefined,
        dob: undefined,
        gender: undefined,
    };
} else {
    user=JSON.parse(user);
}

function signupStep1() {

    // below is called form validation
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    if(password.value == "" || (password.value != confirmPassword.value)){
        console.log("Passwords don't match.");
        return;
    }


    const terms=document.getElementById("terms");
    if(!terms.checked){
        console.log("Terms not checked");
        return;
    }
    const privacy=document.getElementById("privacy");
    if(!privacy.checked){
        console.log("Privacy not checked");
        return;
    }

    // form is valid, we can move to next step
    user.first_name=document.getElementById("firstname").value;
    user.last_name=document.getElementById("lastname").value;
    user.phone=document.getElementById("phone").value;
    user.email=document.getElementById("email").value;
    user.password=password.value;

    const dob=document.getElementById("dob");
    const gender=document.getElementById("gender");
    user.dob=new Date(dob.value).getTime();
    user.gender=parseInt(gender.value);
    console.log(user);

    window.localStorage.setItem("user",JSON.stringify(user));

    window.location.replace("signup-2.html");
}

const form = document.querySelector('form');
form.addEventListener('submit', stopFormDefault);

function stopFormDefault(event){
    event.preventDefault();
    //actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}

//the progress bar
//the camera box

document.addEventListener('DOMContentLoaded', function() {
    signupStep2();
});

function signupStep2() {
    const startCameraButton = document.getElementById('startCameraButton');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const takePhotoButton = document.getElementById('takePhotoButton');
    const overlay = document.getElementById('overlay');

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

function updateFileName() {
    const fileInput = document.getElementById('upload_id');
    const fileLabel = document.getElementById('fileLabel');

    if (fileInput.files.length > 0) {
        fileLabel.textContent = fileInput.files[0].name;
    } else {
        fileLabel.textContent = 'Choose a file';
    }
}

function getData(){
    // fetch(url, options).then(f(x)).catch(f(X))
    const url="http://localhost:5001/"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url, options)
        .then(responseArrived)
        .catch(errorHappened);
        console.log("Hello!!")
}

function responseArrived(response) {
    setTimeout({}, 1000);
    console.log("Success!!!");
    console.log(response);
}

function errorHappened(response) {
    setTimeout({}, 1000);
    console.log("Error!!!");
    console.log(response);
}