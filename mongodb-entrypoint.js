/* eslint-disable no-undef */
db = db.getSiblingDB('gws');
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    {
      role: 'dbOwner',
      db: 'gws',
    },
  ],
});
