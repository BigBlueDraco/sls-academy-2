#! /usr/bin/env node

import ageInput from "./ageInput.js";
import nameInput from "./nameInput.js";
import genderInput from "./genderInput.js";
import writeData from "./writeData.js";
import showDBInput from "./showDBInput.js";

async function welcome() {
  const user = {};
  const filename = "data.txt";

  user.name = await nameInput();
  if (!user.name) {
    await showDBInput();
    return;
  }
  user.gender = await genderInput();
  user.age = await ageInput();
  writeData(filename, user);
  console.log(user);
  welcome();
}

await welcome();
