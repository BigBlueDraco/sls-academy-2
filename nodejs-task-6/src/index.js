import readFile from "./functions/readFile.js";
import existInFiles from "./functions/existInFiles.js";

console.time("Execution Time");

const readingArray = [];
for (let i = 0; i <= 19; i++) {
  readingArray.push(() => readFile(`out${i}.txt`));
}
const wordsCollection = new Map();
const data = await Promise.allSettled(readingArray.map((func) => func()));

const flatDataAll = data.flatMap((elem) => {
  const uniunique = new Set([...elem.value]);
  for (let word of uniunique) {
    if (!wordsCollection.has(word)) {
      wordsCollection.set(word, 1);
    } else {
      wordsCollection.set(word, wordsCollection.get(word) + 1);
    }
  }
  return elem.value;
});

const uniuniqueWord = [...new Set(flatDataAll)];

console.log(uniuniqueWord.length);
console.log(existInFiles(wordsCollection, 20));
console.log(existInFiles(wordsCollection, 10));

console.timeEnd("Execution Time");
