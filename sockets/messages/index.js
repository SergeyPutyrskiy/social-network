const models = require("../../models/index");

const connectedUsers = {};

const messages = socket => {
  socket.on("registerUser", ({ userId }) => {
    connectedUsers[userId] = socket.id;
  });

  socket.on("chat", data => {
    socket.to(connectedUsers[data.receiverId]).emit("chat", { data });
    // connectedUsers[data.receiverId].broadcast.emit("chat", { data });

    models.Message.create({ message: data.message, userId: data.id });
  });
};

module.exports = messages;
