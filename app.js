const express = require('express')
const app = express()
const products = require('./Router/products')
const users = require('./Router/users')
const sample = require('./Router/sample')
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('This is main page')
})
app.use('/products', products)
app.use('/users', users)
app.use('/sample', sample)

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running at', port)
    }
})