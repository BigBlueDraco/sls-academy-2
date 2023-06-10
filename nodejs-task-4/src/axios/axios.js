import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const appid = process.env.API_ID;
const api = axios.create({
  baseURL: "http://api.openweathermap.org/",
  params: {
    appid: appid,
  },
});
export const getCityByQuery = async (q) => {
  try {
    const response = await api.get("/geo/1.0/direct", {
      params: {
        q,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getCityByCords = async ({ lat, lon }) => {
  try {
    const response = await api.get("/geo/1.0/reverse", {
      params: {
        lat,
        lon,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWather = async ({ lat, lon }) => {
  try {
    const response = await api.get("/data/2.5/forecast", {
      params: {
        lat,
        lon,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
