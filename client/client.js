
const clientSocket = io("ws://localhost:6060");

function sendMessage() {
    const msg = document.querySelector(".emergency-msg").value;
    clientSocket.emit("emergency message", msg);
    msg.value = "";
}

clientSocket.on("emergency message", (msg) => {
    
    console.log(msg);
    document.querySelector(".emergency-broadcast").textContent = msg;
});

clientSocket.on("connection", resp => {
    document.querySelector(".emergency-broadcast").textContent = resp;
})