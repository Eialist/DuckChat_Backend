import { Server } from 'socket.io';

const options = {
  cors: {
    origin: "*"
  }
}

let io = undefined;
let clients = [];

function handleNewConnection(clientSocket) {
  // 1. Sparar client sockets för ex. broadcasts via rest anrop
  clients.push(clientSocket);
  console.log("new client, id: " + clientSocket.id);

  // clientSocket.username = clientSocket.handshake.headers.username;
  // console.log(clientSocket.username);
  clientSocket.on("emergency message", (msg) => {
    console.log(msg);

    broadcast("emergency message", msg)
  })

  // 2. Plockar bort klienten från listan när anslutningen för klienten avbryts
  clientSocket.on("disconnect", () => {
    clients = clients.filter(client => client != clientSocket);
    console.log("client disconnected");
  });
}

function sendToUser(username, message) {
  const matchedClients = clients.filter(client => client.username == username);
  matchedClients.forEach(client => client.emit("private", message));
}

function broadcast(channel, message) {
  io.emit(channel, message); //broadcastar till alla på socket servern
}

function attach(container) {
  io = new Server(container, options);
  io.on("connection", handleNewConnection);
}

export default { broadcast, attach, sendToUser }