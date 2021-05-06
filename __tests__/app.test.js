import request from 'supertest';
import app from '../src/app';
import 'regenerator-runtime';


describe('Testing API', () => {
  let startTime;
  beforeEach(() => {
    startTime = new Date('2021-04-21T16:00:16');
  });

  it('should get to the main page', async () => {
    const res = await request(app()).get('/');

    expect(res.status).toEqual(200);
    expect(res.text).toEqual('You are on the main page');
  });

  it('should return cost, time and deadline (with extra coeff) - EN', async () => {
    const language = 'англійська';
    const textSize = 2500;
    const fileExt = '.txt';

    const result = { cost: 360, timeRange: 10, deadline: '4/22/2021, 5:00:16 PM' };

    const res = await request(app())
      .post('/calculate')
      .send({
        language,
        textSize,
        fileExt,
        startTime,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(result);
  });

  it('should return cost, time and deadline (without extra coeff) - EN', async () => {
    const language = 'англійська';
    const textSize = 2500;
    const fileExt = '.doc';

    const result = { cost: 300, timeRange: 8, deadline: '4/22/2021, 3:00:16 PM' };

    const res = await request(app())
      .post('/calculate')
      .send({
        language,
        textSize,
        fileExt,
        startTime,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(result);
  });
});
