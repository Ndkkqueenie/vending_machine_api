const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Deposit endpoint
router.post('/', async (req, res) => {
  const { username, coin } = req.body; // Change "coins" to "coin" for single coin deposit

  // Define valid coin values
  const validCoins = [5, 10, 20, 50, 100];

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'buyer') {
      return res.status(401).json({ error: 'Only buyers are allowed to deposit coins.' });
    }

    // Check if the deposited coin is valid
    if (!validCoins.includes(coin)) {
      return res.status(400).json({ error: 'Invalid coin value. Only 5, 10, 20, 50, and 100 cent coins are allowed.' });
    }

    // Update the user's deposit with the deposited coin value
    user.deposit += coin;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Coin deposited successfully.', newDeposit: user.deposit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
