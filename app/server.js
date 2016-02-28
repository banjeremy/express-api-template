var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bookshelf = require('bookshelf');
var jwt = require('jsonwebtoken');
var config = require('./config');

/*
 * Database connection
 */

var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    // password : 'your_database_password',
    database : 'jwt',
    charset  : 'utf8'
  }
});

bookshelf.DB = bookshelf(knex);

/*
 * Middleware
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

/*
 * Routes
 */

var routes = express.Router();

routes.use('/authenticate', require('./routes/authenticate'));

routes.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to authenticate'
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

routes.use('/users', require('./routes/users'));

app.use('/api', routes);

/*
 * Start the server
 */

var port = process.env.PORT || config.defaultPort;
app.listen(port);
console.log('The party is happening at http://localhost:' + port);
