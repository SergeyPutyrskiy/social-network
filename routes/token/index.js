const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const models = require("../../models/index");

router.post("/", (req, res, next) => {
  const { refreshToken, accessToken } = req.body.tokens;
  const {
    user: { id }
  } = jwt.decode(accessToken.split(" ")[1]);

  models.Token.findAll({ where: { userId: id } }).then(tokenEntries => {
    const isRefreshTokenValid = tokenEntries.some(
      entry => entry.token === refreshToken
    );

    if (tokenEntries.length && isRefreshTokenValid) {
      models.User.findOne({
        where: {
          id
        }
      }).then(user => {
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
          { expiresIn: "300s" },
          (err, accessToken) => {
            res.json({
              data: {
                accessToken,
                refreshToken
              }
            });
          }
        );
      });
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;

      next(err);
    }
  });
});

module.exports = router;
