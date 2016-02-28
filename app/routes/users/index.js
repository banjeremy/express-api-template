var router = require('express').Router();
var User = require('../../models/user');

router.get('/', (req, res) => {
  console.log(req.user);
  User.collection().fetch()
    .then((collection) => {
      res.json(collection.toJSON());
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  User.where({ id })
    .fetch()
    .then((result) => {
      if (!result) {
        res.status(404).end();
      } else {
        res.json(result);
      }
    })
    .catch((err, err2) => {
      res.status(500).end();
    });
});

module.exports = router;
