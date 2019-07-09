import axios from "./config";

class Friends {
  getFriends = userId =>
    axios.get("/friends", { params: { userId } }).then(res => res.data);
}

const friends = new Friends();

export default friends;
