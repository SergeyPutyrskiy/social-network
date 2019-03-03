const messages = socket => {
  // socket.emit("chat", { hello: "world" });

  socket.on("chat", data => {
    console.log("Socket data", data);
    socket.broadcast.emit("chat", { data });
  });
};

module.exports = messages;
