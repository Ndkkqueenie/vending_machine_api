const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)

let products = [
  {
    id: 1,
    content: "Coca Cola",
    important: true
  },
  {
    id: 2,
    content: "Cheese Hambuger",
    important: false
  },
  {
    id: 3,
    content: "Nutella Biscuit",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/products', (request, response) => {
  response.json(products)
})

app.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = products.find(product => product.id === id)
  if (product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = products.length > 0
    ? Math.max(...products.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/products', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const product = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  products = products.concat(product)

  response.json(product)
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  products =products.filter(product => product.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
