const username = document.querySelector(".username-field");
const password = document.querySelector(".password-field");
const loginBtn = document.querySelector(".login-btn");
const serverInfo = document.querySelector(".server-info");
const chatroomField = document.querySelector(".chatroom-field");
const showChatroomsBtn = document.querySelector(".show-chatrooms");
const emergencyMsg = document.querySelector(".emergency-msg");
const emergencyBtn = document.querySelector(".emergency-btn");
const chatMessageField = document.querySelector(".chat-message-field");

const LOGIN_URL = "http://127.0.0.1:6060/auth/login";
const ALL_CHANNELS_URL = "http://127.0.0.1:6060/ducks/api/channel";
const EMERGENCY_BROADCAST_URL = "http://127.0.0.1:6060/ducks/api/broadcast";
const MUSIC_CHAT_CHANNEL_URL = "http://127.0.0.1:6060/ducks/api/channel/2";

async function fetchChannels() {
    const fetchOption= {
        method: "GET",
    }

    const response = await fetch(ALL_CHANNELS_URL, fetchOption);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    
    for (let i = 0; i < data.length; i++) {
        let newData = data[i].subject;
        console.log(newData);
        chatroomField.textContent += " " + newData;
    }
}

fetchChannels();

async function handleLogin() {
    serverInfo.textContent = "You are signing in...";

    const loginData = {
        username: username.value,
        password: password.value,
    }

    const fetchOption = {
        method: "POST", 
        body: JSON.stringify(loginData),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(LOGIN_URL, fetchOption);
    console.log(response);
    const authorizationToken = await response.text();

    sessionStorage.setItem("x-auth-token", authorizationToken);
    fetchMusicChannel();
}



async function fetchMusicChannel() {
    const authorizationToken = sessionStorage.getItem("x-auth-token");

    if(authorizationToken == undefined) {
        console.log("No auth token found");
        return false; 
    }

    
    const fetchOption= {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authorizationToken,
        }
    }

    const response = await fetch(MUSIC_CHAT_CHANNEL_URL, fetchOption);
    // console.log(response);
    let data = await response.json();
    data = data.messages;
    for (let i = 0; i < data.length; i++) {
        let newData = data[i];
        console.log(newData);
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.textContent += JSON.stringify(newData);
        ul.append(li);
    }
}

loginBtn.addEventListener('click', handleLogin);

