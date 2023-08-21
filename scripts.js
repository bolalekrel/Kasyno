window.onload = function () {
    const loggedInUser = localStorage.getItem("loggedUser");


    if (loggedInUser) {
        window.location.href = "kasyno.html";
    }


    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const storedPassword = localStorage.getItem(username);

        if (storedPassword === password) {
   
            localStorage.setItem("loggedUser", username);
            window.location.href = "kasyno.html";
        } else {
            alert("Błąd logowania. Sprawdź nazwę użytkownika i hasło.");
        }
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        if (localStorage.getItem(newUsername)) {
            alert("Nazwa użytkownika jest już zajęta.");
        } else {
            localStorage.setItem(newUsername, newPassword);
            alert("Zarejestrowano nowego użytkownika!");
        }
    });

    const passwordField = document.getElementById("password");
    const showPasswordButton = document.getElementById("showPasswordButton");

    showPasswordButton.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    });

    const passwordRegister = document.getElementById("newPassword");
    const showPasswordButton2 = document.getElementById("showPasswordButton2");

    showPasswordButton2.addEventListener("click", function () {
        if (passwordRegister.type === "password") {
            passwordRegister.type = "text";
        } else {
            passwordRegister.type = "password";
        }
    });

    updateClock = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const clock = document.querySelector(".clock");
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    };

    setInterval(updateClock, 1000);
};


