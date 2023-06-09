import fs from "fs";

export default function readData(filename) {
  let data = [];
  try {
    const jsonData = fs.readFileSync(filename, "utf8");
    data = JSON.parse(jsonData);
  } catch (err) {
    fs.writeFileSync(filename, JSON.stringify([]), "utf8");
  }
  return data;
}
