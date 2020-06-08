const express = require("express");
const cors = require("cors");
const { initDatabase, addUser } = require("./data");
const bodyParser = require("body-parser");

// Initialize app
const app = express();

// Initialize database
initDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post("/users", (req, res) => {
  const user = req.body;
  const result = addUser({ name: user.name });

  res.json({ result });
});

app.listen(process.env.PORT || 3001, function () {
  console.log("CORS-enabled web server listening on port 3001");
});
