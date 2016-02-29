
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, username: 'user 1', email: 'user1@email.com', password: '$2a$10$44hw/Xw6XFoan5o58doHy.HGJD4lyp1JKZNsUvTpryQISbhIABkxK'}),
    knex('users').insert({id: 2, username: 'user 2', email: 'user2@email.com', password: '$2a$10$j/Mt07xybhi96zTjjxfm7On8GVPsSr1rJv9Jw6eCTq5Fm32WkbGzy'}),
    knex('users').insert({id: 3, username: 'user 3', email: 'user3@email.com', password: '$2a$10$6qkmUda/PFjDEZmp0WxoQe3Pz.fLYtx4hsZBsxXJ3NDgCZErbEJT.'})
  );
};
