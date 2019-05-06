const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: 'Username or Password cannot be empty!'
            })
        }
        const user = new User({username, password})
        const data = await user.save()
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})
module.exports = router
