const express = require("express");
const cors = require("cors");

const {
  initDatabase,
  addUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createTask,
  editTask,
  getTasks,
} = require("./data");
const bodyParser = require("body-parser");

// Initialize app
const app = express();

// Initialize database
initDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const result = getUsers();
  res.json({ user: result });
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const result = getUserById(userId);
  res.json({ user: result });
});

app.post("/users", (req, res) => {
  const user = req.body;
  const result = addUser({ name: user.name });

  res.json({ user: result });
});

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const result = deleteUser(userId);
  res.json({ user: result });
});

app.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const name = req.body.name;
  const result = updateUser({ name, userId });
  res.json({ user: result });
});

// TASKS
app.get("/users/:userId/tasks", (req, res) => {
  const { userId } = req.params;
  const result = getTasks({ userId });
  console.log(result);

  res.json({ tasks: result });
});

app.post("/users/:userId/tasks", (req, res) => {
  const { taskName } = req.body;
  const { userId } = req.params;
  const result = createTask({ taskName, userId });
  res.json({ task: result });
});

app.put("/users/:userId/tasks/:taskId", (req, res) => {
  const { userId, taskId } = req.params;
  const { taskName, state } = req.body;
  const result = editTask({ taskName, state, taskId, userId });
  res.json({ task: result });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send({ error: err.message });
});
app.listen(process.env.PORT || 3001, function () {
  console.log("CORS-enabled web server listening on port 3001");
});
