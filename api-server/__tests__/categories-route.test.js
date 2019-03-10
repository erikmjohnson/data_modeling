const {server} = require ('../src/app.js');
const supertest = require ('supertest');
const mockClient = supertest(server);
const supergoose = require ('./supergoose.js');
const Products = require ('../src/models/products.js');
const product = new Products();

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing routes', () => {
  test('Post it!', () => {
  return mockClient
      .post('/categories')
      .send({name: 'Cat Stuff'})
      .then(entry => {
        expect(entry.body.name).toBe('Cat Stuff');
      }).catch( error => console.error(error));
  });
  test('Get it!', () => {
    return mockClient
      .post('/categories')
      .send({name: 'Dog Stuff'})
      .then(entry => {
        return mockClient
          .get('/categories')
        .then(data => {
        expect(data.body.results[1].name).toBe('Dog Stuff');
        expect(data.body.results[0].name).toBe('Cat Stuff');
      }).catch( error => console.error(error));
    });
  });
  test('Get by ID', () => {
    return mockClient
      .post('/categories')
      .send({name: 'Bat Stuff'})
      .then(entry => {
        return mockClient
          .get(`/categories/${entry.body._id}`)
          .then(data => {
            expect(data.body.name).toEqual('Bat Stuff');
        }).catch( error => console.error(error));
    });
  });
  test('Update it!', () => {
    return mockClient
      .post('/categories')
      .send({name: 'Cow Stuff'})
      .then(entry => {
        return mockClient
          .put(`/categories/${entry.body._id}`)
          .send({name: 'Bull Stuff'})
          .then(data => {
            expect(data.body.name).toEqual('Bull Stuff');
        }).catch( error => console.error(error));
    });
  });
  test('Delete it!', () => {
    return mockClient
      .post('/categories')
      .send({name: 'platypus'})
      .then(entry => {
        return mockClient
          .delete(`/categories/${entry.body._id}`)
          .then(() => {
            return mockClient
              .get(`/categories/${entry.body._id}`)
              .then(data => {
                expect(data.body.name).toEqual()
              })
          });
      });
  });
});