import fs from "fs";
import readData from "./readData.js";

export default async function writeData(filename, data) {
  const currentData = await readData(filename);
  currentData.push(data);
  const updatedData = JSON.stringify(currentData);
  fs.writeFileSync(filename, updatedData, "utf8");
}
