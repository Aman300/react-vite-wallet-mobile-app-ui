// controller/socketController.js

const socket = require("socket.io");
const ludoGame = require("../models/ludo.game");

module.exports = function (server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on("send-message", async (data) => {
        let isGame = await ludoGame.find({
            $or:[{
                status: "new"
            }],
        }).populate(["user_id"])            
                
      io.to(data.room).emit("receive-message", isGame); // Emit message to all clients in the specified room
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  });
};
