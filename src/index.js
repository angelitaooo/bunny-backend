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

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const result = getUserById(userId);
  res.json({ user: result });
});

app.post("/users", (req, res) => {
  const user = req.body;
  const result = addUser({ name: user.name });

  res.json({ user: result });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const result = deleteUser(userId);
  res.json({ user: result });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const result = updateUser({ name, userId });
  res.json({ user: result });
});

// TASKS
app.post("/users/:id/tasks", (req, res) => {
  const { taskName } = req.body;
  const userId = req.params.id;
  const result = createTask({ taskName, userId });
  res.json({ user: result });
});

app.put("/users/:id/tasks/:taskId", (req, res) => {
  const { id, taskId } = req.params;
  const { taskName, state } = req.body;

  const result = editTask({ taskName, state, taskId });
  console.log(result);

  res.json({ user: result });
});

app.listen(process.env.PORT || 3001, function () {
  console.log("CORS-enabled web server listening on port 3001");
});
