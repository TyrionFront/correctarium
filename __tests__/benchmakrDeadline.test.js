import { getDeadline } from '../src/processors';
import conditions from '../src/conditions';


describe('calculateResultDate', () => {
  test.each`
      startTime                        | durationHours | expectedResult
      ${'2019/09/23, 10:00'}    | ${5}          | ${'2019/09/23, 15:00'}
      ${'2019/09/23, 18:00'}    | ${7}          | ${'2019/09/24, 16:00'}
      ${'2019/09/23, 18:00'}    | ${25}         | ${'2019/09/26, 16:00'}
      ${'2019/09/21, 15:00'}  | ${7}          | ${'2019/09/23, 17:00'}
      ${'2019/09/20, 17:00'}    | ${60}         | ${'2019/10/01, 14:00'}
      ${'2019/09/21, 17:00'}  | ${60}         | ${'2019/10/01, 16:00'}
      ${'2019/09/24, 08:00'}   | ${8}          | ${'2019/09/24, 18:00'}
      ${'2019/09/25, 08:00'} | ${8}          | ${'2019/09/25, 18:00'}
      ${'2019/09/25, 18:00'} | ${8}          | ${'2019/09/26, 17:00'}
      ${'2019/09/25, 19:00'} | ${8}          | ${'2019/09/26, 18:00'}
      ${'2019/09/25, 18:45'} | ${8}          | ${'2019/09/26, 17:45'}
      ${'2019/09/25, 19:10'} | ${8}          | ${'2019/09/26, 18:00'}
      ${'2019/09/27, 17:00'}    | ${8}          | ${'2019/09/30, 16:00'}
      ${'2019/09/27, 19:00'}    | ${8}          | ${'2019/09/30, 18:00'}
      ${'2019/09/28, 10:00'}  | ${8}          | ${'2019/09/30, 18:00'}
    `(
  'calculateResultDate__table',
  ({ startTime, durationHours, expectedResult }) => {
    const startTime_ = new Date(startTime);
    const expectedResult_ = new Date(expectedResult).toLocaleString();

    expect(getDeadline(durationHours, conditions.timeLimits, startTime_)).toBe(
      expectedResult_,
    );
  },
);
});
