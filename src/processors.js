export const getCost = (price, textSize, lang) => {
  const { def, minPrice } = price[lang];
  const priorPrice = textSize * def;
  const finalPrice = priorPrice < def ? minPrice : priorPrice;

  return finalPrice;
};

export const getTimeRange = (speed, textSize, lang) => {
  const baseTimeHrs = 0.5;
  const { def, minTimeHrs } = speed[lang];
  const timeFromSpeedHrs = textSize / def;
  const timeAmount = timeFromSpeedHrs < 1 ? minTimeHrs : timeFromSpeedHrs + baseTimeHrs;

  return Number(timeAmount.toFixed(2));
};

export const getDeadline = (currentDeadline, timeRange, timeLimits) => {
  const { hrs, weekDays } = timeLimits;

  const changeDay = (date, daysCount) => {
    for (let i = 0; i < daysCount; i += 1) {
      date.setDate(date.getDate() + 1);
      let newWeekDayNum = date.getDay();
      if (newWeekDayNum > weekDays.end) {
        newWeekDayNum = 7;
        const diffDays = newWeekDayNum - weekDays.end;
        date.setDate(date.getDate() + diffDays);
      }
    }
  };
  const currentHrs = currentDeadline.getHours();
  if (currentHrs < timeLimits.hrs.start) {
    currentDeadline.setHours(timeLimits.hrs.start);
  }
  if (currentHrs > timeLimits.hrs.end) {
    changeDay(currentDeadline, 1);
  }
  
  const changeTime = (date, hours) => {
    for (let i = 0; i < hours; i += 1) {
      date.setHours(date.getHours() + 1);
      const newHrs = date.getHours();
      if (newHrs > hrs.end) {
        changeDay(date, 1);
        date.setHours(hrs.start + 1);
      }
    }
    return date.toString();
  };

  const resDate = changeTime(currentDeadline, timeRange);
  return resDate;
};

export const getCostAndDeadline = (conditions, lang, textSize, textExt) => {
  const {
    prices,
    charsPerHour,
    fileFormats,
    extraCoeff,
    currentDeadline,
    timeLimits,
  } = conditions;
  const coeff = fileFormats.has(textExt) ? 1 : extraCoeff;

  const langLowCase = lang.toLowerCase();
  const cost = getCost(prices, textSize, langLowCase) * coeff;
  const timeRange = getTimeRange(charsPerHour, textSize, langLowCase) * coeff;
  const deadline = getDeadline(currentDeadline, Math.round(timeRange), timeLimits);

  return [cost, deadline];
};
