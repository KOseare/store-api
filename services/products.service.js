const faker = require('faker');
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

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
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find () {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
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
