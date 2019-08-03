const express = require("express");

const models = require("../../models/index");

const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.userId1 === req.body.userId2) {
    res.status(422).json({
      error: "User id's should be different"
    });
  } else {
    models.Friends.create({
      userId1: req.body.userId1,
      userId2: req.body.userId2
    })
      .then(friendEntity => {
        const { id, userId1, userId2 } = friendEntity;

        res.json({
          id,
          userId1,
          userId2
        });
      })
      .catch(err =>
        res.status(422).json({
          error: err
        })
      );
  }
});

router.get("/", (req, res) => {
  models.sequelize
    .query(
      `SELECT u."id", u."firstName", u."lastName", u."userName"
       FROM "Users" as u 
       INNER JOIN "Friends" as f 
       ON u."id" = f."userId1" WHERE f."userId2" = ${req.query.userId} 
       UNION
       SELECT u."id", u."firstName", u."lastName", u."userName" 
       FROM "Users" as u 
       INNER JOIN "Friends" as f 
       ON u."id" = f."userId2" WHERE f."userId1" = ${req.query.userId}`,
      {
        type: models.sequelize.QueryTypes.SELECT
      }
    )
    .then(friends => {
      res.json({
        data: {
          friends
        }
      });
    })
    .catch(err =>
      res.status(422).json({
        error: err
      })
    );
});

module.exports = router;
