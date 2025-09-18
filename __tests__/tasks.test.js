const request = require("supertest");
// Use .default if app is exported as ES module
const app = require("../src/index.js").default || require("../src/index.js");

// Tests for GET /tasks/:id
describe("GET /tasks/:id", () => {
  it("should return a task when valid id is provided", async () => {
    const res = await request(app).get("/tasks/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", 1);
    expect(res.body.data).toHaveProperty("title", "Task 1");
    // expect(res.body.data).toHaveProperty("completed", false);
  });

  it("should return 404 if task not found", async () => {
    const res = await request(app).get("/tasks/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Task not found");
  });

  it("should return 400 for invalid id", async () => {
    const res = await request(app).get("/tasks/2abs");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid ID");
  });
});

// tests for POST /tasks
describe("POST /tasks", () => {
  it("should create a new task with valid data", async () => {
    const res = await request(app).post("/tasks").send({
      title: "New Task",
      isComplete: false,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data");
  });

  it("should return 400 for missing data", async () => {
    const res = await request(app).post("/tasks").send({ title: " " });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });
  it("should return 400 for missing status", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "New Task", isComplete: undefined });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });
});
