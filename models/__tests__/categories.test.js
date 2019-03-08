const Categories = require ('../categories.js');
const categories= new Categories();

const supergoose = require ('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Testing categories', () => {
  test('Can I get git g?t it?', () => {
    let newObject = {name: 'Cat Stuff'};
    return categories.post(newObject)
      .then(entry => {
        return categories.get(entry.id)
          .then(category => {
            Object.keys(newObject).forEach(key => {
              expect(category[0][key]).toEqual(newObject[key]);
            });
          });
      });
  });
  test('Can I post it?', () => {
    let newObject = {name: 'Cat Stuff'};
    return categories.post(newObject)
      .then(entry => {
        Object.keys(newObject).forEach(key => {
          expect(entry[key]).toEqual(newObject[key]);
        });
    });
  });
  test('Can I haz put?', () => {
    let newObject = {name: 'Cat Stuff'};
    return categories.post(newObject)
      .then(entry => {
        return categories.put(entry.id, { $set: {name: "Dog Stuff"} })
          .then(category => {
              expect(category.name).toEqual('Dog Stuff');
          });
      });
  });
  test('Cool Cool, but can you delete?', () => {
    let newObject = {name: 'Cat Stuff'};
    return categories.post(newObject)
      .then(entry => {
        return categories.delete(entry.id)
          .then(() => {
            return categories.get(entry.id)
              .then(data => {
                expect(data).toEqual([]);
              })
          });
      });
  });
});