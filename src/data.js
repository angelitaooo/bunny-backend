const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");
const adapter = new FileSync("db.json");
const db = low(adapter);

db._.mixin(lodashId);

const defaults = { users: [] };
const initDatabase = () => db.defaults(defaults).write();

// CRUD

const addUser = (userData) => {
  if (!userData.name) {
    return null;
  }
  const user = {
    name: userData.name,
    tasks: [],
  };
  return db.get("users").insert(user).write();
};

exports.initDatabase = initDatabase;
exports.addUser = addUser;
