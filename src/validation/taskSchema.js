import { z } from "zod";

// schema for task object

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title Required").max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().default(false),
});

// schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title Required").max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().default(false),
});

// schema for validating taskId in params
export const taskIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format").transform(Number),
});
