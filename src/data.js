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
const getTasks = ({ userId }) => {
  return db.get("tasks").filter({ userId });
};

const createTask = ({ userId, taskName, state }) => {
  const user = getUserById(userId);
  const task = {
    taskName,
    state: "todo",
    userId,
  };

  return db.get("tasks").insert(task).write();
};
const getTaskById = (taskId) => {
  if (!taskId) {
    return null;
  }
  return db.get("tasks").getById(taskId);
};

const editTask = ({ taskName, state, taskId }) => {
  const task = getTaskById(taskId);
  return task.assign({ taskName, state }).write();
};

exports.initDatabase = initDatabase;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.createTask = createTask;
exports.editTask = editTask;
exports.getTasks = getTasks;
