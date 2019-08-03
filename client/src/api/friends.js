import axios from "./config";

class Friends {
  getFriends = userId =>
    axios.get("/friends", { params: { userId } }).then(res => res.data);

  addFriend = (userId1, userId2) =>
    axios.post("/friends", { userId1, userId2 });
}

const friends = new Friends();

export default friends;
