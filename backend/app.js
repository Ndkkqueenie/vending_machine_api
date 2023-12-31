const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const sellerRouter = require('./controllers/seller')
const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const depositRouter = require('./controllers/deposit')
const purchaseRouter = require('./controllers/purchase')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/deposit', depositRouter)
app.use('/api/buy', purchaseRouter)

app.use(middleware.unknownEndpoint)

module.exports = app