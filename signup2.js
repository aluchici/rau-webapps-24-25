// elements from the signup-2.html
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const selfiePreview = document.getElementById('selfiePreview');
const captureSelfieButton = document.getElementById('captureSelfie');
const step2Form = document.getElementById('step2Form');

// activate camera
navigator.mediaDevices.getUserMedia({ video: true }) //ask for access the camera
    .then(stream => {
        video.srcObject = stream; //source of camera
    })
    .catch(err => {
        console.error("Error accessing the camera: ", err);
        alert("Unable to access camera. Please check your browser settings."); //message for user
    });

// capture selfie when button clicked
captureSelfieButton.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); //draw the current video in to the canvas
    const selfieData = canvas.toDataURL('image/png'); //convert canvas content to a png data Url

    //display captures selfie
    selfiePreview.innerHTML = `<img src="${selfieData}" alt="Captured Selfie" />`;
});