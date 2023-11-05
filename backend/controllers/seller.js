const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sellerRouter = require('express').Router();
const User = require('../models/user');

sellerRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // Find the user in the database
  const user = await User.findOne({ username });

  if (!user) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  // Check if the user has the "seller" role
  if (user.role !== 'seller') {
    return response.status(401).json({ error: 'Access denied' });
  }

  // Verify the password
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token
  const userForToken = {
    username: user.username,
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, role: user.role });
});

module.exports = sellerRouter;
