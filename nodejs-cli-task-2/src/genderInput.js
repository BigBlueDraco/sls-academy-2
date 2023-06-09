import inquirer from "inquirer";
export default async function genderInput() {
  const choices = ["male", "female", "other"];
  const gender = await inquirer.prompt({
    name: "value",
    type: "list",
    message: "Enter user's name. To cancel press ENTER",
    choices: choices,
  });
  //   const age = await inquirer.prompt({
  //     name: "value",
  //     type: "input",
  //     message: "Enter age",
  //   });

  return gender.value;
}
