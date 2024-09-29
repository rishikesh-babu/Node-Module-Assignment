const express = require('express')
const { user } = require('../store')
const router = express.Router()

router.use((req, res, next) => {
    console.log('This is user')
    next()
})

router.get('/', (req, res) => {
    res.status(200).json(user)
})

router.get('/:id', (req, res) => {
    const params = parseInt(req.params.id)
    console.log(params)

    for (const element of user) {
        if (element.id === params) {
            res.status(200).json(element)
            break
        }
    }
})

router.post('/', (req, res) => {
    const { id, first_name, last_name, email, password } = req.body

    if (!first_name || !password || !last_name || !email) {
        return res.status(400).json({Message: 'Enter first_name, last_name, email, password'})
    }

    const newUser = {
        id: user.length + 1,
        first_name,
        last_name,
        email,
        password
    }

    user.push(newUser)
    res.status(201).json({
        Message: 'User added successfully',
        User: newUser
    })
})

module.exports = router