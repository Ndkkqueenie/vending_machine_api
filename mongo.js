const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://queeniedev:${password}@cluster0.mgvb57x.mongodb.net/vendingMachine?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

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
    type: Number, // Reference to the User model for seller information
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema)

const product = new Product({
  amountAvailable: 20,
  cost: 5.99,
  productName: 'Lemon Cake',
  sellerId: 1
})

product.save().then(result => {
  console.log('product saved!')
  mongoose.connection.close()
})

Product.find({}).then(result => {
  result.forEach(product => {
    console.log(product)
  })
  mongoose.connection.close()
})