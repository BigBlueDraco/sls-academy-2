export default function existInFiles(wordsCollection, fileNumber) {
  let count = 0;

  for (let value of wordsCollection.values()) {
    if (value >= fileNumber) {
      count++;
    }
  }
  return count;
}
