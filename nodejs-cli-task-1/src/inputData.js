#!/usr/bin/env node
import { createInterface } from "readline";

export default async function inputData(userData) {
  const defaultString =
    "ptqPq2tCP7 iTg9DbddGl 7LIuqW5JTF qwRY7wVJ0h khejS2QQTs FYEjFZ1QPh F6X9sApAIS z2KIHZ0bqR v5a5mocAPZ CwiX564pwI 3 1 23 10";
  let rl = createInterface(process.stdin, process.stdout);

  return new Promise((resolve, reject) => {
    rl.question(`What is data you want sort? (${defaultString})`, (data) => {
      data
        ? userData.setData(data.split(" "))
        : userData.setData(defaultString.split(" "));

      const currentData = userData.getAll();
      console.log("Your data is: " + currentData);
      rl.close();
      resolve();
    });
  });
}
