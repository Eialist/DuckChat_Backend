import { Server } from 'socket.io';

const options = {
  cors: {
    origin: "*"
  }
}

let io = undefined;
let clients = [];

function handleNewConnection(clientSocket) {
  clients.push(clientSocket);
  console.log("new client, id: " + clientSocket.id);

  clientSocket.on("emergency message", (msg) => {
    console.log(msg);

    broadcast("emergency message", msg)
  })
 
  clientSocket.on("disconnect", () => {
    clients = clients.filter(client => client != clientSocket);
    console.log("client, id: " + clientSocket.id + ", disconnected");
  });
}

function broadcast(channel, message) {
  io.emit(channel, message); 
}

function attach(container) {
  io = new Server(container, options);
  io.on("connection", handleNewConnection);
}

export default { broadcast, attach}