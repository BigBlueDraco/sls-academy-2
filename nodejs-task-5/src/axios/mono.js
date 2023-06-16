import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const appid = process.env.API_ID;
const api = axios.create({
  baseURL: "https://api.monobank.ua/bank/currency",
});
