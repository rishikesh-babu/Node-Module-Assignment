const express = require('express')
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    res.status(200).json(req.body)
    console.log(req.body)
})
router.get('/:id', (req, res) => {
    res.status(200).json(req.body)
    console.log(req.query, req.body, req.params)
})

module.exports = router