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
        result.get('/categories');
        console.log(result.body);
        expect(result.status).toBe(200);
      }).catch( error => console.error(error));
  });
});