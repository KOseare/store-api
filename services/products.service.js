const faker = require('faker');

class ProductsServices {

  constructor () {
    this.products = [];
    this.generate();
  }

  generate () {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()) / 10,
        image: faker.image.imageUrl()
      });
    }
  }

  create (data) {
    const newProduct = {
      ...data,
      id: faker.datatype.uuid()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find () {
    return this.products;
  }

  findOne (id) {
    return this.products.find(item => item.id === id);
  }

  update (id, changes, patch = false) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    if (patch) {
      this.products[index] = {
        ...this.products[index],
        ...changes
      };
    } else {
      this.products[index] = {...changes, id};
    }
    return this.products[index];
  }

  delete (id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);
    return {id};
  }

}

module.exports = ProductsServices;
