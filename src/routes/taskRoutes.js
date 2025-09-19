const router = require("express").Router();
const { getAllTasks } = require("../controller/taskController.js");

router.get("/tasks", getAllTasks);

module.exports = router;
