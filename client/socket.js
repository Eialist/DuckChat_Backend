const socket = io("http://localhost:6060");

socket.on("connection");

function sendMessage() {
    console.log("clicked");
    const msg = 
    document.querySelector(".emergency-msg").value;
    socket.broadcast("message", msg); 
    msg.value = ""; 
}

socket.on("message", (msg) => {
    document.querySelector(".emergency-broadcast").textContent = msg;
})