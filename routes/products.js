const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const {size} = req.query;
  const limit = size || 100;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()) / 10,
      image: faker.image.imageUrl()
    });
  }
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    id,
    name: 'Product 1',
    price: 1000
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.status(200).json({
    message: 'patch',
    data: body,
    id
  });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.status(200).json({
    message: 'put',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: 'delete',
    id
  });
});

module.exports = router;
