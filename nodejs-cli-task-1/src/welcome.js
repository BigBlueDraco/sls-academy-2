import chalkAnimation from "chalk-animation";
import chalk from "chalk";

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

export default async function welcome() {
  const title = chalkAnimation.rainbow("Rainbowl sorter\n".toUpperCase());
  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgBlue("HOW IT WORKS")}
    I am a process on your computer.
    Enter the ${chalk.bold(
      "data"
    )} you want to sort and select the sorting option
    Let's start!!!`);
}
