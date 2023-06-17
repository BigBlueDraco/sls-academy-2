import TelegramBot from "node-telegram-bot-api";
import NodeCache from "node-cache";
import { getMonoExchangeRate, getPrivatExchangeRate } from "./axios/axios.js";
const bot = new TelegramBot("6289740154:AAH3DdYhY167lzVwgO_cw9qGn9VbsGNBERM", {
  polling: true,
});
const options = {
  reply_markup: {
    keyboard: [["USD"], ["EUR"]],
    resize_keyboard: false,
    one_time_keyboard: true,
  },
};
const currencyCodes = {
  EUR: {
    name: "EUR",
    code: 978,
  },
  USD: {
    name: "USD",
    code: 840,
  },
};
bot.setMyCommands([{ command: "/start", description: "Starting bot" }]);

function handle(results) {
  return results.filter((elem) => elem.status === "fulfilled");
}
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, `Привіт я знаю курс валют`, options);

  return;
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (msg.text === "/start") return;
  if (msg.text !== "USD" && msg.text !== "EUR") {
    await bot.sendMessage(
      chatId,
      "Я вас не розумію, скористайтеся кнопками. Чи введіть: EUR чи USD",
      options
    );
    return;
  }
  const results = await Promise.allSettled([
    getMonoExchangeRate(currencyCodes[text].code),
    getPrivatExchangeRate(currencyCodes[text].name),
  ]);
  const [mono, privat] = handle(results);
  await bot.sendMessage(
    chatId,
    `Курс валют:
  Моно:
  ${
    mono.value.length
      ? `Купівля: ${mono.value[0].rateBuy}; \n  Продаж: ${mono.value[0].rateSell} \n`
      : "Немає данних \n"
  }

  Приват:
  ${
    privat.value.length
      ? `Купівля: ${privat.value[0].buy};\n  Продаж: ${privat.value[0].sale}; \n`
      : "Немає данних \n"
  }
  `,
    options
  );
});
