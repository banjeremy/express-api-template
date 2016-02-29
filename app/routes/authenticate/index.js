var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var app = express();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var fail = function(req, res) {
  res.status(401).json({
    success: false,
    message: 'Authentication failed.'
  });
}

router.post('/', (req, res) => {
  User.where({
    username: req.body.username
  }).fetch()
    .then((user) => {
      if (user) {
        var storedHash = user.get('password');
        
        bcrypt.compare(req.body.password, storedHash, (err, matches) => {
          if (matches) {
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
            fail(req, res);
          }
        });
      } else {
        fail(req, res);
      }
    });
});

module.exports = router;
