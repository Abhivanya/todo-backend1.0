import express from "express";
import { requestDataValidator } from "../middelwares/requestValidator.js";
const router = express.Router();

import { getAllTasks, addTask } from "../controller/taskController.js";

router.get("/tasks", getAllTasks);
router.post("/tasks", requestDataValidator, addTask);

export default router;
