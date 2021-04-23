import request from 'supertest';
import app from '../src/app';
import 'regenerator-runtime';


describe('Testing API', () => {
  it('should get to the main page', async () => {
    const res = await request(app()).get('/');

    expect(res.status).toEqual(200);
    expect(res.text).toEqual('You are on the main page');
  });

  it('should return cost, time and readline', async () => {
    const language = 'українська';
    const textSize = 1500;
    const fileExt = '.txt';

    const result = { cost: 90, timeRange: 2, deadline: '4/21/2021, 6:00:16 PM' };

    const res = await request(app())
      .post('/calculate')
      .send({
        language,
        textSize,
        fileExt,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(result);
  });
});
