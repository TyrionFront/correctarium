import express from 'express';
import conditions from './conditions';
import { getCostAndDeadline } from './processors';

export default () => {
  // const [language, size, ext] = process.argv.slice(2);
  // const res = getCostAndDeadline(conditions, language, size, ext);
  // console.log(res);
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200);
    res.send('You are on the main page');
  });

  app.post('/calculate', (req, res) => {
    const { textSize, language, fileExt } = req.body;
    const [
      cost,
      timeRange,
      deadline,
    ] = getCostAndDeadline(conditions, language, textSize, fileExt);

    res.status(201);
    res.json({ cost, timeRange, deadline });
  });

  return app;
};
