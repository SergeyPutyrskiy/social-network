const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const models = require("../../models/index");

router.post("/", (req, res) => {
  const { id, refreshToken } = req.body.user;

  models.Token.findAll({ where: { user_id: id } })
    .then(tokenEntries => {
      const isRefreshTokenValid = tokenEntries.some(
        entry => entry.token === refreshToken
      );

      if (tokenEntries.length && isRefreshTokenValid) {
        models.User.findOne({
          where: {
            id
          }
        })
          .then(user => {
            const { id, userName, email, firstName, lastName } = user;
            const userInfo = {
              id,
              userName,
              email,
              firstName,
              lastName
            };

            jwt.sign(
              { user: userInfo },
              "devSecretKey",
              { expiresIn: "20s" },
              (err, accessToken) => {
                res.json({
                  accessToken,
                  refreshToken
                });
              }
            );
          })
          .catch(err =>
            res.status(500).send({
              error: err
            })
          );
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err =>
      res.status(404).send({
        error: err
      })
    );
});

module.exports = router;
