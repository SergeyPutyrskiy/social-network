import axios from "./config";

export default {
  getMessages: (userId, friendId) =>
    axios
      .get("/messages", { params: { userId, friendId } })
      .then(res => res.data)
};
