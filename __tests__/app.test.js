import {
  getCost, getTimeRange, getDeadline, getCostAndDeadline,
} from '../src/processors';
import conditions from '../src/conditions';


it('check "getCost"', () => {
  const { prices } = conditions;
  const lang = 'українська';

  const textSize = 1500;
  const finalCost = 75;
  expect(getCost(prices, textSize, lang)).toEqual(finalCost);

  const textSize2 = 1000;
  const finalCost2 = 50;
  expect(getCost(prices, textSize2, lang)).toEqual(finalCost2);
});

it('check "getTimeRange"', () => {
  const { charsPerHour } = conditions;
  const lang = 'українська';

  const textSize = 1500;
  const timeAmount = 1.63;
  expect(getTimeRange(charsPerHour, textSize, lang)).toEqual(timeAmount);

  const textSize2 = 1000;
  const timeAmount2 = 1;
  expect(getTimeRange(charsPerHour, textSize2, lang)).toEqual(timeAmount2);
});

it('check "getDeadline" - within 1 working day', () => {
  const { timeLimits } = conditions;
  const timeAmount = 2;
  const startDate = new Date('2021-04-21T16:34:16');
  const deadline = new Date('2021-04-21T18:34:16');

  expect(getDeadline(startDate, timeAmount, timeLimits)).toEqual(deadline);
});

it('check "getDeadline" - increment day by 1', () => {
  const { timeLimits } = conditions;
  const timeAmount = 6;
  const startDate = new Date('2021-04-21T16:34:16');
  const deadline = new Date('2021-04-22T13:34:16');

  expect(getDeadline(startDate, timeAmount, timeLimits)).toEqual(deadline);
});

it('check "getDeadline" - count days right', () => {
  const { timeLimits } = conditions;
  const timeAmount = 55;
  const startDate = new Date('2021-04-21T10:00:16');
  const deadline = new Date('2021-04-29T11:00:16');

  expect(getDeadline(startDate, timeAmount, timeLimits)).toEqual(deadline);
});

it('calculate cost and deadline by "getCostAndDeadline" - UA', () => {
  const lang = 'українська';
  const textSize = 1500;
  const textExt = '.txt';

  const date = new Date(conditions.currentDeadline);
  date.setHours(date.getHours() + 2);
  const result = [90, date];

  expect(getCostAndDeadline(conditions, lang, textSize, textExt)).toEqual(result);
});

it('calculate minimal cost and deadline by "getCostAndDeadline" - RU', () => {
  const lang = 'російська';
  const textSize = 1000;
  const textExt = '.doc';

  const date = new Date(conditions.currentDeadline);
  date.setHours(date.getHours() + 1);
  const result = [50, date];

  expect(getCostAndDeadline(conditions, lang, textSize, textExt)).toEqual(result);
});
