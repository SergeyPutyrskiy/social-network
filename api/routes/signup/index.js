const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const models = require("../../models/index");

router.post("/", (req, res) => {
  const {
    firstName: firstNameReq,
    lastName: lastNameReq,
    email: emailReq,
    password: passwordReq,
    userName: userNameReq
  } = req.body;
  const saltRounds = 10;

  bcrypt.hash(passwordReq, saltRounds).then(hash => {
    models.User.create({
      userName: userNameReq,
      firstName: firstNameReq,
      lastName: lastNameReq,
      email: emailReq,
      password: hash
    }).then(user => {
      const { id, userName, firstName, lastName, email } = user;

      res.json({
        id,
        userName,
        firstName,
        lastName,
        email
      });
    });
  });
});

module.exports = router;
