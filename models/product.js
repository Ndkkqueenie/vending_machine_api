const mongoose = require('mongoose');

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const productSchema = new mongoose.Schema({
  amountAvailable: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for seller information
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
