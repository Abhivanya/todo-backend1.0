const fs = require("fs").promises;
const path = require("path");

let filePath = path.join(__dirname, "../data/tasks.json");

function setNewFilePath(newPath) {
  filePath = newPath;
}

async function readTasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks, setNewFilePath };
