import axios from "./config";

class User {
  signIn = userData => axios.post("/signin", userData).then(res => res.data);

  signUp = userData => axios.post("/signup", userData).then(res => res.data);

  getUser = accessToken =>
    axios
      .get("/profile", { headers: { Authorization: accessToken } })
      .then(res => res.data);
}

const user = new User();

export default user;
