
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, username: 'user 1', email: 'user1@email.com', password: 'abc123'}),
    knex('users').insert({id: 2, username: 'user 2', email: 'user2@email.com', password: 'abc123'}),
    knex('users').insert({id: 3, username: 'user 3', email: 'user3@email.com', password: 'abc123'}),
    knex('users').insert({id: 4, username: 'user 4', email: 'user4@email.com', password: 'abc123'})
  );
};
