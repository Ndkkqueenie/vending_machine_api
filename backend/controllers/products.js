const productsRouter = require('express').Router();
const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const sellerAuth = (req, res, next) => {
  
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (decoded.role !== 'seller') {
    return res.status(403).json({ error: 'Access denied' });
  }

  next(); // Allow access for sellers
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
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const product = new Product({
    amountAvailable: body.amountAvailable,
    cost: body.cost,
    productName: body.productName,
    sellerId: user._id
  })
    
  const savedProduct = await product.save();
  // Update the seller's products array
  user.products = user.products.concat(savedProduct._id);
  await user.save();

  response.status(201).json(savedProduct);
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

module.exports = productsRouter;
