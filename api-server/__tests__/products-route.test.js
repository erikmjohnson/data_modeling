const Products = require ('../src/models/products.js');
const product = new Products();

const supergoose = require ('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);