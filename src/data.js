const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");
const adapter = new FileSync("db.json");
const db = low(adapter);

db._.mixin(lodashId);

const defaults = { users: [] };
const initDatabase = () => db.defaults(defaults).write();

// CRUD
const getUsers = () => {
  return db.get("users");
};

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

const deleteUser = (userId) => {
  if (!userId) {
    return null;
  }
  return db.get("users").remove({ id: userId }).write();
};

const getUserById = (userId) => {
  if (!userId) {
    return null;
  }
  return db.get("users").getById(userId);
};

const updateUser = ({ name, userId }) => {
  const user = getUserById(userId);
  return user.assign({ name }).write();
};

exports.initDatabase = initDatabase;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
