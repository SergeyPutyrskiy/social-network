const express = require("express");

const router = express.Router();
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const users = require("./routes/users");
const token = require("./routes/token");
const friends = require("./routes/friends");
const messages = require("./routes/messages");
const messagesSocket = require("./sockets/messages");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/users", users);
app.use("/token", token);
app.use("/friends", friends);
router.get("/messages", messages.getMessages);

app.use(router);

app.use((err, req, res, next) => {
  console.log(err.stack);

  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

io.on("connection", messagesSocket);

// {force: true}
models.sequelize
  .sync()
  .then(() => {
    server.listen(3000, () => console.log("App listen 3000 port"));
  })
  .catch(err => console.log("Sequelize sync error ", err));

// Todo add request validator
