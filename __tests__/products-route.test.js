const {server} = require ('../src/app.js');
const supertest = require ('supertest');
const mockClient = supertest(server);

const supergoose = require ('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing routes', () => {
  test('Post it!', () => {
  return mockClient
    .post('/products')
    .send({name: 'Cat Stuff'})
      .then(entry => {
        expect(entry.body.name).toBe('CAT STUFF');
})
});
  test('Get it!', () => {
    return mockClient
      .post('/products')
      .send({name: 'Dog Stuff'})
        .then(entry => {
         return mockClient
          .get('/products')
            .then(data => {
             expect(data.body.results[1].name).toBe('DOG STUFF');
             expect(data.body.results[0].name).toBe('CAT STUFF');
            })
        });
  });
  test('Get by ID', () => {
    return mockClient
      .post('/products')
      .send({name: 'Bat Stuff'})
        .then(entry => {
          return mockClient
          .get(`/products/${entry.body._id}`)
            .then(data => {
              expect(data.body.name).toEqual('BAT STUFF');
            })
        });
  });
  test('Update it!', () => {
    return mockClient
      .post('/products')
      .send({name: 'Cow Stuff'})
        .then(entry => {
          return mockClient
            .put(`/products/${entry.body._id}`)
            .send({name: 'Bull Stuff'})
              .then(data => {
                expect(data.body.name).toEqual('Bull Stuff');
              })
        });
  });
  test('Delete it!', () => {
    return mockClient
    .post('/products')
    .send({name: 'platypus'})
      .then(entry => {
        return mockClient
        .delete(`/products/${entry.body._id}`)
          .then(() => {
            return mockClient
            .get(`/products/${entry.body._id}`)
              .then(data => {
                expect(data.body.name).toEqual()
              })
          });
      });
  });
});