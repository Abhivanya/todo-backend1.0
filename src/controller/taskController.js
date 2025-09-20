import { v4 as uuidv4 } from "uuid";

import { readTasks, writeTasks } from "../utils/fileOperation.js";

export const getAllTasks = async (req, res) => {
  const tasks = await readTasks();

  res.status(200).json({
    data: tasks,
    message: "Tasks retrieved successfully",
    success: true,
  });
};

// without validation middelware middelware
// const addTask = async (req, res) => {
//   try {
//     const parsedData = createTaskSchema.parse(req.body);

//     const tasks = await readTasks();
//     // creating new task
//     const newTask = {
//       id: uuidv4(),
//       ...parsedData,
//     };
//     // adding new task to array
//     tasks.push(newTask);
//     writeTasks(tasks);

//     res.status(201).json({
//       message: "Task Added Successfully",
//       success: true,
//       data: newTask,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.errors, data: null });
//   }
// };

export const addTask = async (req, res) => {
  const data = req.body;

  const tasks = await readTasks();

  const newTask = {
    id: uuidv4(),
    ...data,
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json({
    success: true,
    message: "Task added Successfully",
    data: newTask,
  });
};
