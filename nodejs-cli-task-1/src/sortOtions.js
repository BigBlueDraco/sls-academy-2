import { createInterface } from "readline";
export default async function sortOptions(userData) {
  const choices = [
    {
      name: "Sort words alphabetically",
      value() {
        return userData.getSortedWords();
      },
    },

    {
      name: "Show numbers from lesser to greater",
      value() {
        return userData.getSortedNumbers();
      },
    },

    {
      name: "Show numbers from bigger to smaller",
      value() {
        return [...userData.getSortedNumbers()].reverse();
      },
    },

    {
      name: "Display words in ascending order by number of letters in the word",
      value() {
        return userData.getSortedByLength();
      },
    },

    {
      name: "Show only unique words",
      value() {
        return userData.getUniqeWords();
      },
    },

    {
      name: "Display only unique values from the set of words and numbers entered by the user",
      value() {
        return userData.getUnique();
      },
    },

    {
      name: "exit",
      value() {
        process.exit(0);
      },
    },
  ];
  let rl = createInterface(process.stdin, process.stdout);

  choices.forEach((item, index) => console.log(`${index + 1}: ${item.name}`));
  return new Promise((resolve, reject) => {
    rl.question(`Choice sort option: `, (data) => {
      const stringWitoutSpaces = data.replace(/\s/g, "");
      if (!isNaN(stringWitoutSpaces)) {
        console.log(choices[+stringWitoutSpaces - 1].value());
        rl.close();
        sortOptions(userData);
      }
    });
  });
}
