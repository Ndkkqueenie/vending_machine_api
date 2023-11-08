const config = require('../utils/config')
const request = require('supertest');
const app = require('../app'); //
const User = require('../models/user');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to a test database before running the tests
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database after running the tests
  await mongoose.connection.close();
});

describe('Deposit Endpoint', () => {
  beforeEach(async () => {
    // Clear the User collection or set up test users before each test
    await User.deleteMany();
  });

  it('should deposit a valid coin into the user account', async () => {
    // Create a test user
    const testUser = new User({
      username: 'testuser',
      role: 'buyer',
      deposit: 0,
    });
    await testUser.save();

    // Define the deposit request body
    const depositRequest = {
      username: 'testuser',
      coin: 10, // A valid coin value
    };

    const response = await request(app)
      .post('/api/deposit')
      .send(depositRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Coin deposited successfully.');
    expect(response.body).toHaveProperty('newDeposit', 10); // Check the updated deposit value

    // Check the user's deposit in the database
    const updatedUser = await User.findOne({ username: 'testuser' });
    expect(updatedUser.deposit).toBe(10);
  });

  it('should return an error for an invalid coin value', async () => {
    // Create a test user
    const testUser = new User({
      username: 'testuser',
      role: 'buyer',
      deposit: 0,
    });
    await testUser.save();

    // Define an invalid coin value
    const depositRequest = {
      username: 'testuser',
      coin: 30, // An invalid coin value
    };

    const response = await request(app)
      .post('/api/deposit')
      .send(depositRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Invalid coin value. Only 5, 10, 20, 50, and 100 cent coins are allowed.'
    );
  });

  it('should return an error if the user is not found', async () => {
    // Define a deposit request for a non-existent user
    const depositRequest = {
      username: 'nonexistentuser',
      coin: 10,
    };

    const response = await request(app)
      .post('/api/deposit')
      .send(depositRequest);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should return an error if the user is not a buyer', async () => {
    // Create a test user with a different role (not 'buyer')
    const testUser = new User({
      username: 'testuser',
      role: 'seller', // A non-buyer role
      deposit: 0,
    });
    await testUser.save();

    // Define a deposit request for the test user
    const depositRequest = {
      username: 'testuser',
      coin: 10,
    };

    const response = await request(app)
      .post('/api/deposit')
      .send(depositRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Only buyers are allowed to deposit coins.');
  });
});
