export const createForecastMessage = (data, interval = 3) => {
  return data.reduce(
    (acc, elem) => {
      const date = new Date(elem.dt * 1000);
      const month = date.getMonth();
      const day = date.getDay();
      const hours = date.getHours();
      if (!(acc.date.month === month && acc.date.day === day)) {
        acc.date = { month: date.getMonth(), day: date.getDay() };
        acc.message += "\n################\n";
        acc.message += `Дата: ${date.getDate()}.${date.getMonth() + 1}\n`;
      }
      if (Math.floor(acc.time + interval * 60 * 60) === +elem.dt || !acc.time) {
        acc.time = elem.dt;
        acc.message += "\n";
        acc.message += ` ${hours} годині: \n   Температура:${elem.main.temp}; \n`;
        return acc;
      }
      return acc;
    },
    {
      time: 0,
      message: "Погода в вашому місті: \n",
      date: { month: -1, day: -1 },
    }
  ).message;
};
