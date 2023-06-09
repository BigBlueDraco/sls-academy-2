import inquirer from "inquirer";
export default async function ageInput() {
  const age = await inquirer.prompt({
    name: "value",
    type: "input",
    message: "Enter age",
  });

  return age.value;
}
