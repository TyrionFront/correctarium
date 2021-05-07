export const getCost = (prices, textSize, lang) => {
  const { price, minPrice } = prices[lang];
  const priorPrice = textSize * price;
  const finalPrice = priorPrice < minPrice ? minPrice : priorPrice;

  return finalPrice;
};

export const getTimeRange = (speeds, textSize, lang) => {
  const baseTimeHrs = 0.5;
  const { speed, minTimeHrs } = speeds[lang];
  const timeFromSpeedHrs = textSize / speed;
  const timeAmount = timeFromSpeedHrs < 1 ? minTimeHrs : timeFromSpeedHrs + baseTimeHrs;

  return Number(timeAmount.toFixed(1));
};

export const getDeadline = (timeRange, timeLimits, time) => {
  const isValidTime = !Number.isNaN(Date.parse(time));
  const startTime = isValidTime ? new Date(time) : new Date();
  const { start, end } = timeLimits;

  const incrementDay = (date) => {
    const weekDay = date.getDay();
    if (weekDay > end.weekDay) {
      while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
      }
    }
  };

  const incrementTime = (date) => {
    const currentHrs = date.getHours();
    if (currentHrs > end.hrs) {
      date.setDate(date.getDate() + 1);
      incrementDay(date);
      date.setHours(start.hrs + 1);
    }
  };

  const startHrs = startTime.getHours();

  if (startHrs < start.hrs || startHrs >= end.hrs) {
    startTime.setHours(start.hrs);
    startTime.setMinutes(start.mins);
  }

  if (startHrs >= end.hrs) {
    startTime.setDate(startTime.getDate() + 1);
  }

  if (startTime.getDay() > end.weekDay) {
    incrementDay(startTime);
    startTime.setHours(start.hrs);
    startTime.setMinutes(start.mins);
  }

  for (let i = 0; i < timeRange; i += 1) {
    startTime.setHours(startTime.getHours() + 1);
    incrementTime(startTime);
  }

  return startTime.toLocaleString();
};

export const getCostAndTimeRange = (conditions, lang, textSize, textExt) => {
  const {
    prices,
    charsPerHour,
    fileFormats,
    extraCoeff,
  } = conditions;
  const coeff = fileFormats.has(textExt) ? 1 : extraCoeff;

  const langLowCase = lang.toLowerCase();
  const cost = getCost(prices, textSize, langLowCase) * coeff;
  const timeRange = Math.round(getTimeRange(charsPerHour, textSize, langLowCase) * coeff);

  return [cost, timeRange];
};
