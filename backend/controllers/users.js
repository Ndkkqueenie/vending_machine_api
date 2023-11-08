const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// List all users (accessible to anyone)
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('products');
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// User registration (no authentication required)
usersRouter.post('/', async (request, response) => {
  try {
    const { username, password, role } = request.body;

    // Validate the role
    if (role !== 'buyer' && role !== 'seller') {
      return response.status(400).json({ error: 'Invalid role' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
      role,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

// Retrieve user details
usersRouter.get('/:username', async (request, response) => {
  const username = request.params.username;
  try {
    const user = await User.findOne({ username: username }); // Use findOne to find the user by username
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' });
  }
});

// Update user information
usersRouter.put('/:userId', async (request, response) => {
  const userId = request.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, request.body, {
      new: true,
    });
    if (updatedUser) {
      response.json(updatedUser);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a user
usersRouter.delete('/:userId', async (request, response) => {
  const userId = request.params.userId;
  try {
    await User.findByIdAndRemove(userId);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = usersRouter;
