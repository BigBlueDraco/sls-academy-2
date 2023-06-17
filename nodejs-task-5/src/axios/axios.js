import axios from "axios";
import NodeCache from "node-cache";
const cache = new NodeCache();

export const getMonoExchangeRate = async (code) => {
  try {
    const rates = cache.get("mono-rates");
    if (rates) return rates;
    const exchangeRate = await axios.get(
      "https://api.monobank.ua/bank/currency"
    );
    const res = exchangeRate.data.filter(
      ({ currencyCodeA, currencyCodeB }) =>
        currencyCodeA === code && currencyCodeB !== 840
    );
    cache.set("mono-rates", res, 60);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getPrivatExchangeRate = async (name) => {
  try {
    const rates = cache.get("privat-rates");
    if (rates) return rates;
    const exchangeRate = await axios.get(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
    );
    cache.set("privat-rates", exchangeRate.data, 60);
    const res = exchangeRate.data.filter(({ ccy }) => ccy === name);
    return res;
  } catch (e) {
    console.error(e);
  }
};
