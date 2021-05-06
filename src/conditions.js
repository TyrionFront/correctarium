const prices = {
  українська: {
    price: 0.05,
    minPrice: 50,
  },
  російська: {
    price: 0.05,
    minPrice: 50,
  },
  англійська: {
    price: 0.12,
    minPrice: 120,
  },
};

const charsPerHour = {
  українська: {
    speed: 1333,
    minTimeHrs: 1,
  },
  російська: {
    speed: 1333,
    minTimeHrs: 1,
  },
  англійська: {
    speed: 333,
    minTimeHrs: 1,
  },
};

const timeLimits = {
  start: {
    weekDay: 1,
    hrs: 10,
    mins: 0,
  },
  end: {
    weekDay: 5,
    hrs: 19,
    mins: 0,
  },
};

const fileFormats = new Set(['.doc', '.docx', '.rtf']);

export default {
  prices,
  charsPerHour,
  fileFormats,
  extraCoeff: 1.2,
  timeLimits,
};
