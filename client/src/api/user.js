import axios from "./config";

class User {
  signIn = userData => axios.post("/signin", userData).then(res => res.data);

  signUp = userData => axios.post("/signup", userData).then(res => res.data);

  getUser = (accessToken, userId) =>
    axios
      .get(`/users/${userId}`, { headers: { Authorization: accessToken } })
      .then(res => res.data);

  reAuthenticate = tokens =>
    axios.post("/token", { tokens }).then(res => res.data);
}

const user = new User();

export default user;
