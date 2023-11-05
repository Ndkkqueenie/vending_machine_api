const mongoose = require('mongoose');

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

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema);
