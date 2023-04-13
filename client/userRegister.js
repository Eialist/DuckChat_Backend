const registerUsername = document.querySelector(".register-username");
const registerPassword = document.querySelector(".register-password");
const registerBtn = document.querySelector(".register-btn");
const serverInfo = document.querySelector(".server-info");

const REGISTER_URL = "http://127.0.0.1:6060/ducks/api/register";

async function handleRegister() {

    const registerData = {
        username: registerUsername.value,
        password: registerPassword.value,
        role: "user",
    }

    const fetchOption = {
        method: "POST", 
        body: JSON.stringify(registerData),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(REGISTER_URL, fetchOption);
    console.log(response);

    serverInfo.textContent = "You are registered!";
}

registerBtn.addEventListener('click', handleRegister);