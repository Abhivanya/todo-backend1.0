const { readTasks, writeTasks } = require("../utils/fileOperation.js");

const getAllTasks = async (req, res) => {
  const tasks = await readTasks();

  res.status(200).json({
    data: tasks,
    message: "Tasks retrieved successfully",
    success: true,
  });
};

module.exports = { getAllTasks };
