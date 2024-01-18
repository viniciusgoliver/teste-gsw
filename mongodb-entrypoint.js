/* eslint-disable no-undef */
db = db.getSiblingDB("gsw");
db.createUser({
  user: "mongo",
  pwd: "mongo",
  roles: [
    {
      role: "dbOwner",
      db: "gsw",
    },
  ],
});
