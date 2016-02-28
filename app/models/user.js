const bookshelf = require('bookshelf').DB;

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
