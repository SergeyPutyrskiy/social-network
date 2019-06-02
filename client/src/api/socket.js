import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

const subscribeToSocket = cb => {
  socket.on(process.env.REACT_APP_CHAT_CHANNEL, data => cb(data));
};

export { socket, subscribeToSocket };
