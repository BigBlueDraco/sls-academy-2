import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

export default async function readFile(fileName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const response = readFileSync(path.join(__dirname, `../files/${fileName}`));
  return response.toString().split("\n");
}
