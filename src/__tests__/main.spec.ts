import { default as request } from 'supertest';

import { bootstrap } from '../main';

describe('App', () => {
  const app = bootstrap().app;

  it('should run', async () => {
    return await request(app).get('/').expect(200);
  });

  it('should have a /verify endpoint', (done) => {
    request(app).post('/verify').expect(200, done);
  });

  it('should have a /graphql endpoint', async () => {
    return await request(app).post('/graphql').expect(400);
  });

  it('should have a /docs endpoint', async () => {
    await request(app).patch('/docs').expect(200);
  });

  it('should validate a password', async () => {
    const res = await request(app)
      .post('/verify')
      .send({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSpecialChars', value: 4 }],
      });

    expect(res.body).toEqual({ verify: false, noMatch: ['minSpecialChars'] });
  });

  it("should validate a password's rules in graphql", async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
          verify(password: "TesteSenhaForte!123&", rules: [{rule: "minSpecialChars", value: 4}]) {
            verify
            noMatch
          }
        }
      `,
      });

    expect(res.body).toEqual({
      data: {
        verify: {
          verify: false,
          noMatch: ['minSpecialChars'],
        },
      },
    });
  });
});
