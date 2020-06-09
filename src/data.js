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
    throw new Error("Username should not be blank");
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
    throw new Error("UserId does not exist");
  }
  return db.get("users").getById(userId);
};

const updateUser = ({ name, userId }) => {
  if (!name) {
    throw new Error("Username should not be blank");
  }
  const user = getUserById(userId);
  return user.assign({ name }).write();
};

// TASKS
const getTasks = ({ userId }) => {
  return db.get("tasks").filter({ userId });
};

const createTask = ({ userId, taskName, state }) => {
  const user = getUserById(userId);
  if (!user.value()) {
    throw new Error("UserId should exist");
  }
  if (!taskName) {
    throw new Error("Task name should not be blank");
  }

  const task = {
    taskName,
    state: "todo",
    userId,
  };

  return db.get("tasks").insert(task).write();
};
const getTaskById = (taskId) => {
  if (!taskId) {
    throw new Error("taskId should exist");
  }
  return db.get("tasks").getById(taskId);
};

const editTask = ({ taskName, state, taskId, userId }) => {
  const user = getUserById(userId);
  const task = getTaskById(taskId);
  if (!task.value()) {
    throw new Error("TaskId should exist");
  }
  if (!user.value()) {
    throw new Error("UserId should exist");
  }
  if (!taskName) {
    throw new Error("Task name should not be blank");
  }
  if (!state) {
    throw new Error("State should not be blank");
  }
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
