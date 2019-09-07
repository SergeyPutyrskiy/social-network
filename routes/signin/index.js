const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const bcrypt = require("bcrypt");
const models = require("../../models/index");

router.post("/", (req, res, next) => {
  const {
    password: passwordFromRequest,
    email: emailNameFromRequest
  } = req.body;

  models.User.findOne({
    where: {
      email: emailNameFromRequest
    }
  }).then(user => {
    if (!user) {
      const err = new Error("User doesn't exist");
      err.status = 404;

      next(err);
    } else {
      const { id, userName, email, firstName, lastName, password: hash } = user;
      const userInfo = {
        id,
        userName,
        email,
        firstName,
        lastName
      };
      const refreshToken = `${randtoken.uid(255)}`;

      bcrypt.compare(passwordFromRequest, hash).then(isPasswordValid => {
        if (isPasswordValid) {
          models.Token.create({
            token: refreshToken,
            userId: id
          }).then(() => {
            jwt.sign(
              { user: userInfo },
              "devSecretKey",
              { expiresIn: "300s" },
              (err, accessToken) => {
                res.json({
                  data: {
                    user: userInfo,
                    accessToken,
                    refreshToken
                  }
                });
              }
            );
          });
        } else {
          const err = new Error("Invalid password");
          err.status = 401;

          next(err);
        }
      });
    }
  });
});

module.exports = router;
