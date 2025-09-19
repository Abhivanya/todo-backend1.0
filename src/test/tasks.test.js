const path = require("path");
const request = require("supertest");
const app = require("../index.js");
const {
  writeTasks,
  readTasks,
  setNewFilePath,
} = require("../utils/fileOperation.js");

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
