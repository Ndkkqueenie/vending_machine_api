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
  content: String,
  important: Boolean,
})

const Product = mongoose.model('Product', productSchema)

const product = new Product({
  content: 'Chocolate Milk-Shake',
  important: true,
})

product.save().then(result => {
  console.log('product saved!')
  mongoose.connection.close()
})