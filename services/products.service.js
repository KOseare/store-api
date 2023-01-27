const boom = require('@hapi/boom');
const {Op} = require('sequelize');

const {models} = require('../libs/sequelize');

class ProductsServices {

  constructor () {}

  async create (data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find ({limit, offset, price, priceMin, priceMax}) {
    const options = {
      include: ['category'],
      where: {}
    };

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsServices;
