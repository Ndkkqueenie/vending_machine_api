const productsRouter = require('express').Router()
const Product = require('../models/product'); // Import your Product model

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

// List all products (accessible to anyone)
productsRouter.get('/', async (request, response) => {
  const products = await Product.find();
  response.json(products);
});

// Retrieve product details
productsRouter.get('/:id', async (request, response) => {
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
productsRouter.post('/', sellerAuth, async (request, response) => {
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
productsRouter.put('/:id', sellerAuth, async (request, response) => {
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
productsRouter.delete('/:id', sellerAuth, async (request, response) => {
  const id = request.params.id;
  try {
    await Product.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = productsRouter