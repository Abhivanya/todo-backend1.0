const { z } = require("zod");

// schema for task object

const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title Required").max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().default(false),
});

// schema for creating a new task
const createTaskSchema = z.object({
  title: z.string().min(1, "Title Required").max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().default(false),
});

// schema for validating taskId in params
const taskIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format").transform(Number),
});

module.exports = { taskSchema, createTaskSchema, taskIdSchema };
