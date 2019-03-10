const Products = require ('../src/models/products.js');
const product = new Products();

const supergoose = require ('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing products', () => {
  test('Can I get git g?t it?', () => {
    let newObject = {name: 'CATSHARP', description: 'Sharpens your dull cat'};
    return product.post(newObject)
      .then(entry => {
        return product.get(entry._id)
          .then(category => {
            Object.keys(newObject).forEach(key => {
              expect(category[0][key]).toEqual(newObject[key]);
            });
          });
      });
  });
  test('Can I post it?', () => {
    let newObject = {name: 'CATSHARP', description: 'Sharpens your dull cat'};
    return product.post(newObject)
      .then(entry => {
        Object.keys(newObject).forEach(key => {
          expect(entry[key]).toEqual(newObject[key]);
        });
      });
  });
  test('Can I haz put?', () => {
    let newObject = {name: 'Catsharp', description: 'Sharpens your dull cat'};
    return product.post(newObject)
      .then(entry => {
        return product.put(entry.id, {name: "Dog Buff", description: 'Buff out that old rusty dog'})
          .then(category => {
            expect(category.name).toEqual('Dog Buff');
          });
      });
  });
  test('Cool Cool, but can you delete?', () => {
    let newObject = {name: 'Catsharp', description: 'Sharpens your dull cat'};
    return product.post(newObject)
      .then(entry => {
        return product.delete(entry.id)
          .then(() => {
            return product.get(entry.id)
              .then(data => {
                expect(data).toEqual([]);
              })
          });
      });
  });
});