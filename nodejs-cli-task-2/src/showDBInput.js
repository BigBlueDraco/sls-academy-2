import inquirer from "inquirer";
import readData from "./readData.js";
export default async function showDBInput() {
  const show = await inquirer.prompt({
    name: "value",
    type: "confirm",
    message: "Show db",
  });
  const data = await readData("data.json");
  console.log(data);
  if (show.show);

  const name = await inquirer.prompt({
    name: "value",
    type: "input",
    message: "Enter user's name for find user in database",
  });
  "asdasdaASDas".toLowerCase();
  const res = data.filter(
    (item) => item.name.toLowerCase() === name.value.toLowerCase()
  );
  console.log(res);
  process.exit(1);
}
