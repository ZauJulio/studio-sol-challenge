import { default as request } from 'supertest';

import { bootstrap } from '../main';

describe('App', () => {
  const app = bootstrap().app;

  it('should run', () => {
    request(app).get('/').expect(200);
  });

  it('should have a /verify endpoint', (done) => {
    request(app).post('/verify').expect(200, done);
  });

  it('should have a /graphql endpoint', () => {
    request(app).post('/graphql').expect(200);
  });

  it('should have a /docs endpoint', () => {
    request(app).patch('/docs').expect(200);
  });

  it('should validate a password', () => {
    request(app)
      .post('/verify')
      .send({
        password: 'TesteSenhaForte!123&',
        rules: [{ rule: 'minSpecialChars', value: 4 }],
      })
      .expect(
        200,
        JSON.stringify({ verify: false, noMatch: ['minSpecialChars'] }),
      );
  });

  it("should validate a password's rules in graphql", () => {
    request(app)
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
      })
      .expect(
        200,
        JSON.stringify({
          data: {
            verify: {
              verify: false,
              noMatch: ['minSpecialChars'],
            },
          },
        }),
      );
  });
});
