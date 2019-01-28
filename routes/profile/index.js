const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");

    req.token = bearer[1];
    next();
  } else {
    res.status(403).json({
      error: {
        name: "AuthorizationHeaderError",
        message: "Authorization header wasn't provided"
      }
    });
  }
};

router.get("/", checkToken, (req, res) => {
  jwt.verify(req.token, "devSecretKey", (err, authData) => {
    if (err) {
      const { name, message } = err;
      res.status(401).json({
        error: {
          name,
          message
        }
      });
    } else {
      res.json({
        data: {
          user: authData.user
        }
      });
    }
  });
});

module.exports = router;
