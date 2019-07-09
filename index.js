const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const profile = require("./routes/profile");
const token = require("./routes/token");
const messages = require("./routes/messages");
const friends = require("./routes/friends");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/profile", profile);
app.use("/token", token);
app.use("/friends", friends);

io.on("connection", messages);

// {force: true}
models.sequelize
  .sync()
  .then(() => {
    server.listen(3000, () => console.log("App listen 3000 port"));
  })
  .catch(err => console.log("Sequelize sync error ", err));

// Todo add request validator
// Todo refactore sending erros for response
