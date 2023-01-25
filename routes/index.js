const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./user.router');
const customersRouter = require('./customer.router');
const categoryRouter = require('./category.router');
const orderRouter = require('./order.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoryRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
