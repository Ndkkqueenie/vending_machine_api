const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Product = require('../models/product')

test('products are returned as json', async () => {
  await api
    .get('/api/products')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there is one product', async () => {
  const response = await api.get('/api/products')

  expect(response.body).toHaveLength(1)
})

test('the first product is cake', async () => {
  const response = await api.get('/api/products')

  expect(response.body[0].productName).toBe('Lemon Cake')
})

afterAll(async () => {
  await mongoose.connection.close()
})