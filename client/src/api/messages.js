import axios from "./config";

export default {
  getMessages: (senderId, receiverId) =>
    axios
      .get("/messages", { params: { senderId, receiverId } })
      .then(res => res.data)
};
