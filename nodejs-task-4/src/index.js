import { getCityByCords, getCityByQuery, getWather } from "./axios/axios.js";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { createForecastMessage } from "./functions/createForecastMessage.js";
dotenv.config();
let city = "";
const token = process.env.TELEGRAM_TOKEN;
const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "З інтервалом в 3 години", callback_data: 3 }],
      [{ text: "З інтервалом в 6 години", callback_data: 6 }],
    ],
  }),
};
const bot = new TelegramBot(token, {
  polling: true,
});
async function sendCurrentCityMessage(chatId) {
  city.length
    ? await bot.sendMessage(chatId, `Погода в місті ${city[0].name}`, options)
    : await bot.sendMessage(
        chatId,
        `Вибачте не можу знайти ваше місто, давай спробуємо ще раз`
      );
}

bot.setMyCommands([{ command: "/start", description: "Starting bot" }]);

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, `Відправте вашу локацію чи назву міста`);
  return;
});

bot.on("location", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const { latitude, longitude } = msg.location;
    city = await getCityByCords({ lat: latitude, lon: longitude });
    sendCurrentCityMessage(chatId);
  } catch (e) {
    console.log(e);
  }
});

bot.on("message", async (msg) => {
  try {
    if (!msg.text) return;
    if (msg.text != "/start") {
      const chatId = msg.chat.id;
      city = await getCityByQuery(msg.text);
      sendCurrentCityMessage(chatId);
    }
  } catch (e) {
    console.log(e);
  }
});

bot.on("callback_query", async (msg) => {
  try {
    const { data: interval } = msg;
    const chatId = msg.message.chat.id;
    const { lat, lon } = city[0];
    const { list } = await getWather({ lat, lon });

    await bot.sendMessage(
      chatId,
      `Погода в місті ${city[0].name} \n` +
        createForecastMessage(list, interval)
    );
  } catch (e) {
    console.log(e);
  }
});
