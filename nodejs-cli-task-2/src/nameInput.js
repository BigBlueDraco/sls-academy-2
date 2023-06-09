import inquirer from "inquirer";
export default async function nameInput() {
  const answer = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Enter user's name. To cancel press ENTER",
  });
  if (answer.name.replace(/\s/g, "") === "") return null;

  return answer.name;
}
