const {server} = require ('../src/app.js');
const supertest = require ('supertest');
const mockClient = supertest(server);
const supergoose = require ('./supergoose.js');
const Products = require ('../src/models/products.js');
const product = new Products();

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing routes', () => {
  test('get it!', () => {
    return mockClient
      .post('/categories')
      .send({name: 'Cat Stuff'})
      .then( result => {
        // console.log(result.json);
        console.log(result.body.name);
        expect(result.body.name).toBe('Cat Stuff');
      }).catch( error => console.error(error));
  });
});