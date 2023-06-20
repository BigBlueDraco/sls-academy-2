import readData from "./readData.js";
import writeData from "./writeData.js";

const data = await readData("./data/vacations.json");

const users = [];
data.forEach((element) => {
  const { startDate, endDate } = element;

  const index = users.findIndex((user) => {
    return user.userId === element.user["_id"];
  });
  if (index !== -1) {
    users[index].vacations.push({ startDate, endDate });
    return;
  }
  const { _id: userId, name: userName } = element.user;
  users.push({ userId, userName, vacations: [{ startDate, endDate }] });
  return;
});

await writeData("./data/users.json", users);
