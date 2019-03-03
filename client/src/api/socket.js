import io from "socket.io-client";
import { BASE_URL } from "../constants/api";

const socket = io(BASE_URL);

// socket.on("connect", () => {
//   console.log("connect ");
// });
// socket.on("disconnect", () => {
//   console.log("disconnect ");
// });

const subscribeToSocket = cb => {
  socket.on("chat", data => cb(data));
};

export { socket, subscribeToSocket };
