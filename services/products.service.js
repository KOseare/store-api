const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class ProductsServices {

  constructor () {
    this.products = [];
    this.generate();
  }

  async generate () {
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

  async create (data) {
    const newProduct = {
      ...data,
      id: faker.datatype.uuid()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find () {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne (id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update (id, changes, patch = false) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
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

  async delete (id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);
    return {id};
  }

}

module.exports = ProductsServices;
