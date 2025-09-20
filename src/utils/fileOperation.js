import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filePath = path.join(__dirname, "../data/tasks.json");

export function setNewFilePath(newPath) {
  filePath = newPath;
}

export async function readTasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}
