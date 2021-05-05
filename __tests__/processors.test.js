import {
  getCost, getTimeRange, getDeadline, getCostAndDeadline,
} from '../src/processors';
import conditions from '../src/conditions';


beforeEach(() => {
  conditions.currentDeadline = new Date('2021-04-21T16:00:16');
});

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
  const timeAmount = 1.6;
  expect(getTimeRange(charsPerHour, textSize, lang)).toEqual(timeAmount);

  const textSize2 = 1000;
  const timeAmount2 = 1;
  expect(getTimeRange(charsPerHour, textSize2, lang)).toEqual(timeAmount2);
});

it('check "getDeadline" - within 1 working day', () => {
  const { timeLimits, currentDeadline } = conditions;
  const timeAmount = 2;
  const deadline = (new Date('2021-04-21T18:00:16')).toLocaleString();

  expect(getDeadline(currentDeadline, timeAmount, timeLimits)).toEqual(deadline);
});

it('check "getDeadline" - increment day by 1', () => {
  const { timeLimits, currentDeadline } = conditions;
  const timeAmount = 6;
  const deadline = (new Date('2021-04-22T13:00:16')).toLocaleString();

  expect(getDeadline(currentDeadline, timeAmount, timeLimits)).toEqual(deadline);
});

it('check "getDeadline" - increment deadline sequentially', () => {
  const { timeLimits, currentDeadline } = conditions;

  const timeAmount = 6;
  const deadline = (new Date('2021-04-22T13:00:16')).toLocaleString();
  expect(getDeadline(currentDeadline, timeAmount, timeLimits)).toEqual(deadline);

  const nextTimeAmount = 2;
  const nextDeadline = (new Date('2021-04-22T15:00:16')).toLocaleString();
  expect(getDeadline(currentDeadline, nextTimeAmount, timeLimits)).toEqual(nextDeadline);
});

it('check "getDeadline" - count days right', () => {
  const { timeLimits } = conditions;
  const timeAmount = 55;
  const startDate = new Date('2021-04-21T10:00:16');
  const deadline = (new Date('2021-04-29T11:00:16')).toLocaleString();

  expect(getDeadline(startDate, timeAmount, timeLimits)).toEqual(deadline);
});

it('calculate cost and deadline by "getCostAndDeadline" - UA', () => {
  const lang = 'українська';
  const textSize = 1500;
  const textExt = '.txt';

  const date = new Date(conditions.currentDeadline);
  const cost = 90;
  const timeRange = 2;
  date.setHours(date.getHours() + timeRange);
  const result = [cost, timeRange, date.toLocaleString()];

  expect(getCostAndDeadline(conditions, lang, textSize, textExt)).toEqual(result);
});

it('calculate minimal cost and deadline by "getCostAndDeadline" - RU', () => {
  const lang = 'російська';
  const textSize = 1000;
  const textExt = '.doc';

  const date = new Date(conditions.currentDeadline);
  const cost = 50;
  const timeRange = 1;
  date.setHours(date.getHours() + 1);
  const result = [cost, timeRange, date.toLocaleString()];

  expect(getCostAndDeadline(conditions, lang, textSize, textExt)).toEqual(result);
});
