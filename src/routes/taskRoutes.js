import express from "express";
import { requestDataValidator } from "../middelwares/requestValidator.js";
const router = express.Router();

import { getAllTasks, addTask } from "../controller/taskController.js";
import { createTaskSchema } from "../validation/taskSchema.js";

router.get("/tasks", getAllTasks);
router.post("/tasks", requestDataValidator(createTaskSchema), addTask);

export default router;
