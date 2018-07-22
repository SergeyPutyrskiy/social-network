const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../../models/index');

router.post('/', (req, res) => {
  const {
    firstName, lastName,
    email, password, userName,
  } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds).then(hash => {
    models.User.create({
      userName,
      firstName,
      lastName,
      email,
      password: hash,
    })
    .then(user => {
      const { userName, firstName, lastName, email } = user;

      res.json({
        userName,
        firstName,
        lastName,
        email,
      });
    })
    .catch(err => res.status(422).json({
      error: err,
    }));
  });
});

module.exports = router;