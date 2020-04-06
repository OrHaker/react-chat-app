const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

let userCount = 1;
//on user connection
io.on("connection", (socket) => {
  userCount++;
  let userName;
  if (socket.handshake.query.user) userName = socket.handshake.query.user;
  else userName = "Guest " + userCount;

  socket.emit("SET_USERNAME", userName);

  io.sockets.emit("CREATE_MESSAGE", {
    content: `${userName} has been connected`,
  });

  //user send message
  socket.on("SEND_MESSAGE", (message) => {
    io.sockets.emit("CREATE_MESSAGE", message);
  });

  //user log out

  socket.on("disconnect", () => {
    userCount--;
    io.sockets.emit("CREATE_MESSAGE", {
      content: `${userName} has been disconnected`,
    });
  });
});

//start server listening
server.listen(port, () => {
  console.log("listening on " + port);
});
