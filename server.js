require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product'); // Import your Product model

const app = express();
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json());
app.use(requestLogger);

// Role-based access control middleware
const sellerAuth = (req, res, next) => {
  // Check the user's role based on your authentication mechanism.
  // For example, if you are using JWT tokens with a "role" claim, you can access it like this:
  const token = req.header('Authorization');
  if (token) {
    const decoded = jwt.verify(token, 'your-secret-key'); // Use your actual secret key
    if (decoded.role === 'seller') {
      next(); // Allow access for sellers
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// List all products (accessible to anyone)
app.get('/api/products', async (request, response) => {
  const products = await Product.find();
  response.json(products);
});

// Retrieve product details
app.get('/api/product/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const product = await Product.findById(id);
    if (product) {
      response.json(product);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' });
  }
});

// Create a new product (seller role required)
app.post('/api/products', sellerAuth, async (request, response) => {
  const { amountAvailable, cost, productName, sellerId } = request.body;
  try {
    const product = new Product({ amountAvailable, cost, productName, sellerId });
    await product.save();
    response.status(201).json(product);
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

// Update product information (seller role required)
app.put('/api/product/:id', sellerAuth, async (request, response) => {
  const id = request.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (updatedProduct) {
      response.json(updatedProduct);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a product (seller role required)
app.delete('/api/product/:id', sellerAuth, async (request, response) => {
  const id = request.params.id;
  try {
    await Product.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
