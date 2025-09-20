import path from "path";
import { fileURLToPath } from "url";
import request from "supertest";
import app from "../index.js";
import {
  writeTasks,
  readTasks,
  setNewFilePath,
} from "../utils/fileOperation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/tasks.test.json");

beforeEach(async () => {
  // Reset the tasks.json file before each test
  setNewFilePath(filePath);
  const initialData = [
    {
      id: 1,
      title: "Sample Task",
      description: "This is a sample task",
      completed: false,
    },
    {
      id: 2,
      title: "Sample Task 2",
      description: "This is a sample task 2",
      completed: false,
    },
  ];
  await writeTasks(initialData);
});

// get all tasks test case
describe("GET /api/tasks", () => {
  it("should retrieve all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body).toHaveProperty("message", "Tasks retrieved successfully");
    expect(res.body).toHaveProperty("success", true);
  });
});

// add New task test case
describe("POST /api/tasks", () => {
  it("should Create a new Task", async () => {
    const newTask = { title: "new Test Task" };
    const res = await request(app).post("/api/tasks").send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("success", true);
  });

  it("should faild with zod vaildation that title is missing", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });
});
