const express = require('express')
const { products } = require('../store')
const router = express.Router()

router.use((req, res, next) => {
    console.log('This is middleware')
    next()
})

router.get('/', (req, res) => {
    // Extract the manufacturer from the query string
    const { manufacturer } = req.query;

    if (manufacturer) {
        console.log(manufacturer)
        // If no manufacturer is provided, return all products
        let filteredProducts = products;

        if (manufacturer) {
            filteredProducts = products.filter(product =>
                product.manufacturer.toLowerCase() === manufacturer.toLowerCase()
            );
        }

        // Return the filtered products as JSON
        res.json(filteredProducts);
    } else {
        res.status(200).json(products)
    }
});


router.get('/:id', (req, res) => {
    const params = parseInt(req.params.id)
    console.log('Params:', params)
    const product = products.find(element => element.id === params);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
})
router.post('/', (req, res) => {
    console.log(req.body)
    const { carname, manufacturer, year } = req.body;


    if (!carname || !manufacturer || !year) {
        return res.status(400).json({ message: 'Please provide carname, manufacturer, year and price' });
    }

    const newProduct = {
        id: products.length + 1, // Simple ID generation (should ideally be unique)
        carname,
        year,
        manufacturer
    };

    products.push(newProduct);
    res.status(200).json({
        message: 'Product added successfully',
        product: newProduct
    });
});


module.exports = router