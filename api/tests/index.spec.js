const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const db = require('../db/index');

beforeAll(async() => await db());
const randomString = Math.floor(Math.random() * 100000);

describe('create short URL endpoint', () => {
  it('should return error if URL is not provided in the request', async () => {
    const res = await request(app)
    .post('/short')
    .send({});

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBe('Url not supplied');
  });
 
  it('should return error if URL is not provided in the request', async () => {
    const res = await request(app)
    .post('/short')
    .send({
      url: ""
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBe('Url not supplied');
  });
  
  it('should return error if URL is not valid', async () => {
    const res = await request(app)
    .post('/short')
    .send({
      url: "ab"
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBe('Url does not appear valid');
  });
  
  it('should create a new short url', async () => {
    const res = await request(app)
    .post('/short')
    .send({
      url: `https://www.google.com/search?q=asymptomatically+tight+bond&oq=asymptomatically+tight+bond&aqs=chrome..69i57.8660j0j7&sourceid=chrome&ie=UTF-8&${randomString}`
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('url');
  });

  it('should retrieve exisitng short url', async () => {
    const res = await request(app)
    .post('/short')
    .send({
      url: `https://www.google.com/search?q=asymptomatically+tight+bond&oq=asymptomatically+tight+bond&aqs=chrome..69i57.8660j0j7&sourceid=chrome&ie=UTF-8&${randomString}`
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('url');
  });
});

describe('retrieve long or original URL endpoint', () => {
  it('should return status code 200, if short URL parameter is not supplied in the query', async () => {
    const res = await request(app)
    .get(`/`)

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({});
  });

  it('should return error if short URL does not have an equivalent long URL in the record', async () => {
    const res = await request(app)
    .get('/k')

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBe('Url not available in record');
  });
});

afterAll(async() => await mongoose.disconnect());