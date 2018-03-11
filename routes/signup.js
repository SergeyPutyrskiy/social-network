const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({routeName: 'Signup'});
});

module.exports = router;