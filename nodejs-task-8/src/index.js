import axios from "axios";

const urls = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

const data = await Promise.allSettled(urls.map((url) => axios.get(url)));

function findKeyValue(wantedKey, obj = {}) {
  let res;
  if ("isDone" in obj) {
    res = obj[`${wantedKey}`];
    return res;
  }
  for (const key in obj) {
    if (typeof obj[key] !== "object") {
      continue;
    }
    res = findKeyValue(`${wantedKey}`, obj[key]);
  }
  return res;
}

const res = data.reduce(
  (acc, elem) => {
    if (elem.value.statusText !== "OK") {
      acc.failed += 1;
      return acc;
    }
    acc.success += 1;
    findKeyValue("isDone", elem.value.data)
      ? (acc.trueValuesCount += 1)
      : (acc.falseValuesCount += 1);
    return acc;
  },
  { trueValuesCount: 0, falseValuesCount: 0, failed: 0, success: 0 }
);
console.table(res);
