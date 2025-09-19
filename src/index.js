const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const morgan = require("morgan");

const app = express();

// middelware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
