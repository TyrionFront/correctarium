const prices = {
  українська: {
    def: 0.05,
    minPrice: 50,
  },
  російська: {
    def: 0.05,
    minPrice: 50,
  },
  англійська: {
    def: 0.12,
    minPrice: 120,
  },
};

const charsPerHour = {
  українська: {
    def: 1333,
    minTimeHrs: 1,
  },
  російська: {
    def: 1333,
    minTimeHrs: 1,
  },
  англійська: {
    def: 333,
    minTimeHrs: 1,
  },
};

const timeLimits = {
  hrs: {
    start: 10,
    end: 19,
  },
  weekDays: {
    start: 1,
    end: 5,
  },
};

const fileFormats = new Set(['.doc', '.docx', '.rtf']);

export default {
  prices,
  charsPerHour,
  fileFormats,
  extraCoeff: 1.2,
  timeLimits,
  currentDeadline: new Date('2021-04-21T16:00:16'),
};
