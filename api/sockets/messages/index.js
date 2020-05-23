const models = require("../../models/index");

const connectedUsers = {};

const messages = socket => {
  socket.on("subscribeUser", ({ userId }) => {
    connectedUsers[userId] = socket.id;
  });

  socket.on("chat", data => {
    socket.to(connectedUsers[data.receiver.id]).emit("chat", { data });
    // connectedUsers[data.receiverId].broadcast.emit("chat", { data });

    models.Message.create({
      message: data.message,
      senderId: data.sender.id,
      receiverId: data.receiver.id
    });
  });

  socket.on("unsubscribeUser", ({ userId }) => {
    delete connectedUsers[userId];
  });
};

module.exports = messages;
