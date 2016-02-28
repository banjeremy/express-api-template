var express = require('express');
var router = express.Router();
var app = express();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

router.post('/', (req, res) => {
  User.where({
    username: req.body.username,
    password: req.body.password
  }).fetch()
    .then((user) => {
      if (user) {
        var token = jwt.sign(user.toJSON(), config.secret, {
          expiresInMinutes: 1440 // 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          data: {
            token
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Authentication failed.'
        });
      }
    });
});

module.exports = router;
