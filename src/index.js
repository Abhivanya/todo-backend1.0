const express = require("express");
const { task } = require("./db/db.js");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/tasks", (req, res) => {
  res.json(task);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id))
    return res.status(400).json({ message: "Invalid ID", success: false });

  const singleTask = task.find((t) => t.id === Number(id));
  if (!singleTask)
    return res.status(404).json({ message: "Task not found", success: false });
  res.json({ message: "Task found", success: true, data: singleTask });
});

app.post("/tasks", (req, res) => {
  const { title, isComplete } = req.body;
  if (!title || typeof isComplete !== "boolean")
    return res.status(400).json({ message: "Invalid data", success: false });

  const newTask = {
    id: task.length + 1,
    title,
    isComplete,
  };
  task.push(newTask);
  res
    .status(201)
    .json({ message: "Task created", success: true, data: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id))
    return res.status(400).json({ message: "Invalid ID", success: false });

  const { title, isComplete } = req.body;
  if (!title || typeof isComplete !== "boolean")
    return res.status(400).json({ message: "Invalid data", success: false });
  const taskIndex = task.findIndex((t) => t.id === Number(id));
  if (taskIndex === -1)
    return res.status(404).json({ message: "Task not found", success: false });

  task[taskIndex] = { id: Number(id), title, isComplete };
  res.json({ message: "Task updated", success: true, data: task[taskIndex] });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id))
    return res.status(400).json({ message: "Invalid ID", success: false });
  const taskIndex = task.findIndex((t) => t.id === Number(id));
  if (taskIndex === -1)
    return res.status(404).json({ message: "Task not found", success: false });

  task.splice(taskIndex, 1);
  res.json({ message: "Task deleted", success: true });
});

module.exports = app;
