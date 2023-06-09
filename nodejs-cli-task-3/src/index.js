#! /usr/bin/env node
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const dotenv = require("dotenv");
const { Command } = require("commander");
const program = new Command();

dotenv.config();
process.env["NTBA_FIX_350"] = 1;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

program.name("telegram-message-sender").version("0.8.0");

program
  .command("send-message")
  .alias("m")
  .description("Send message in telegram")
  .argument("<message>", "string to send")
  .action(async (str) => {
    await bot.sendMessage(chatId, str);
  });

program
  .command("send-photo")
  .alias("p")
  .description("Send photo in telegram")
  .argument("<path>", "path to file")
  .action(async (photo) => {
    await bot.sendPhoto(chatId, photo);
    process.exit(0);
  });

program.parse();
