const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { Op } = Sequelize;

const models = require("../../models/index");

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

router.get("/", (req, res) => {
  models.User.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        "concat",
        Sequelize.fn("LOWER", Sequelize.col("firstName")),
        " ",
        Sequelize.fn("LOWER", Sequelize.col("lastName"))
      ),
      {
        [Op.like]: `%${req.query.q.toLowerCase()}%`
      }
    )
  })
    .then(users => {
      res.json({
        data: users
      });
    })
    .catch(err => {
      res.status(422).json({
        error: err
      });
    });
});

router.get("/:id", checkToken, (req, res) => {
  jwt.verify(req.token, "devSecretKey", err => {
    if (err) {
      const { name, message } = err;
      res.status(401).json({
        error: {
          name,
          message
        }
      });
    } else {
      models.User.findByPk(req.params.id)
        .then(user => {
          res.json({
            data: {
              user
            }
          });
        })
        .catch(err =>
          res.status(422).json({
            error: err
          })
        );
    }
  });
});

module.exports = router;
