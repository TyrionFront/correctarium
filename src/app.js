import conditions from './conditions';
import { getCostAndDeadline } from './processors';

export default () => {
  const [language, size, ext] = process.argv.slice(2);
  const res = getCostAndDeadline(conditions, language, size, ext);
  console.log(res);
  return res;
};
