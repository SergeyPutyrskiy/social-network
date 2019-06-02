const models = require("../../models/index");

const messages = socket => {
  socket.on("chat", data => {
    console.log("chat data ====== ", data);

    socket.broadcast.emit("chat", { data });
    models.Message.create({ message: data.message, userId: data.id });
  });
};

module.exports = messages;
