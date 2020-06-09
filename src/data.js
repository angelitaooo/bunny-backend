const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");
const adapter = new FileSync("db.json");
const db = low(adapter);

db._.mixin(lodashId);

const defaults = { users: [], tasks: [] };
const initDatabase = () => db.defaults(defaults).write();

// USERS
const getUsers = () => {
  return db.get("users");
};

const addUser = (userData) => {
  if (!userData.name) {
    return null;
  }
  const user = {
    name: userData.name,
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

// TASKS

const createTask = ({ userId, taskName, state }) => {
  const user = getUserById(userId);
  const task = {
    taskName,
    state,
    userId,
  };

  return db.get("tasks").insert(task).write();
  console.log("==== TASKS ====");
  console.log(task);
  console.log("==== USER ====");
  console.log(user);
};

exports.initDatabase = initDatabase;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.createTask = createTask;
