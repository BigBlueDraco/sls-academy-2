#!/usr/bin/env node
import UserData from "./UserData.js";
import sortOptions from "./sortOtions.js";
import inputData from "./inputData.js";
import welcome from "./welcome.js";
const userData = new UserData();

await welcome();
await inputData(userData);
await sortOptions(userData);
