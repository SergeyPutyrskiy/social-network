const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const users = require("./routes/users");
const token = require("./routes/token");
const messages = require("./routes/messages");
const friends = require("./routes/friends");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/users", users);
app.use("/token", token);
app.use("/friends", friends);

app.use((err, req, res) => {
  res.status(err.status || 500).json({ error: err.message });
});

io.on("connection", messages);

// {force: true}
models.sequelize
  .sync()
  .then(() => {
    server.listen(3000, () => console.log("App listen 3000 port"));
  })
  .catch(err => console.log("Sequelize sync error ", err));

// Todo add request validator
