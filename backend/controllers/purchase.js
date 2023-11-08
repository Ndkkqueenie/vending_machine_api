const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

// Purchase endpoint
router.post('/', async (req, res) => {
  const { username, productId, quantity } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'buyer') {
      return res.status(401).json({ error: 'Only buyers are allowed to make purchases.' });
    }

    // Find the product by productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate the total amount spent
    const totalAmount = product.cost * quantity;

    // Check if the user has enough balance to make the purchase
    if (user.deposit < totalAmount) {
      return res.status(400).json({ error: 'Insufficient balance to make the purchase.' });
    }

    // Update the user's balance and purchased products
    user.deposit -= totalAmount;
    user.products.push(product);

    // Save the updated user data
    await user.save();

    res.status(200).json({
      totalAmountSpent: totalAmount,
      productsPurchased: {
        id: product._id,
        productName: product.productName,
        cost: product.cost,
        quantity,
      },
      change: user.deposit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
