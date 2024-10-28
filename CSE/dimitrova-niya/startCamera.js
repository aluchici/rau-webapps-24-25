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