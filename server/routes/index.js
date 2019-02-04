const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
  console.log(req)
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;
