import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import morgan from "morgan";

const app = express();

// middelware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
