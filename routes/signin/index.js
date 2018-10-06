const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const bcrypt = require("bcrypt");
const models = require("../../models/index");

router.post("/", (req, res) => {
  const {
    password: passwordFromRequest,
    userName: userNameFromRequest
  } = req.body;

  models.User.findOne({
    where: {
      userName: userNameFromRequest
    }
  })
    .then(user => {
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
          })
            .then(() => {
              jwt.sign(
                { user: userInfo },
                "devSecretKey",
                { expiresIn: "300s" },
                (err, accessToken) => {
                  res.json({
                    routeName: "signin",
                    user: userInfo,
                    accessToken,
                    refreshToken
                  });
                }
              );
            })
            .catch(err =>
              res.status(422).json({
                error: err
              })
            );
        } else {
          res.status(401).json({
            error: {
              name: "WrongCredentialsError",
              message: "Invalid password"
            }
          });
        }
      });
    })
    .catch(() =>
      res.status(404).json({
        error: {
          name: "WrongUserError",
          message: `User wasn't found`
        }
      })
    );
});

module.exports = router;
