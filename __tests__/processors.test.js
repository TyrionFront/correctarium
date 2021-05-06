import {
  getCost, getTimeRange, getDeadline,
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
  const timeAmount = 1.6;
  expect(getTimeRange(charsPerHour, textSize, lang)).toEqual(timeAmount);

  const textSize2 = 1000;
  const timeAmount2 = 1;
  expect(getTimeRange(charsPerHour, textSize2, lang)).toEqual(timeAmount2);
});

let startDate;
beforeEach(() => {
  startDate = new Date('2021-04-21T16:00:16');
});

it('check "getDeadline" - within 1 working day', () => {
  const { timeLimits } = conditions;
  const timeAmount = 2;
  const deadline = (new Date('2021-04-21T18:00:16')).toLocaleString();

  expect(getDeadline(timeAmount, timeLimits, startDate)).toEqual(deadline);
});

it('check "getDeadline" - increment day by 1', () => {
  const { timeLimits } = conditions;
  const timeAmount = 6;
  const deadline = (new Date('2021-04-22T13:00:16')).toLocaleString();

  expect(getDeadline(timeAmount, timeLimits, startDate)).toEqual(deadline);
});

it('check "getDeadline" - count days right', () => {
  const { timeLimits } = conditions;
  const timeAmount = 55;
  startDate = new Date('2021-04-21T10:00:16');
  const deadline = (new Date('2021-04-29T11:00:16')).toLocaleString();

  expect(getDeadline(timeAmount, timeLimits, startDate)).toEqual(deadline);
});
