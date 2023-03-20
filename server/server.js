const http = require("http");

const { Server } = require("socket.io");

const httpServer = http.createServer();

const PORT = 8080,
  HOST = "localhost";

const io = new Server(httpServer, {
  cors: {
    origin: "*", // or a list of origins you want to allow e.g ["http://localhost:3000"]
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("notification", message);
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log("Server running on port:", PORT);
});
