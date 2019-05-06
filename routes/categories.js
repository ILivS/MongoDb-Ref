const express = require('express')
const router = new express.Router()
const Category = require('../models/category')
const Todos = require('../models/todos')
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name cannot be empty!'
            })
        }
        const user = await User.find({})
        const userID = user[0]._id
        const category = new Category({name, user: userID})
        const data = await category.save()
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})
router.get('/', async (req, res) => {
    try {
        const data = await Category.find({})
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const data = await Category.find({_id})
        res.status(200).send({success: true, data: data[0]})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

router.get('/:id/todos', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const data = await Todos.find({
            categories: {$elemMatch: {$eq : _id}}
        })
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

router.post('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const {name} = req.body
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name cannot be empty!'
            })
        }
        const data = await Category.findOneAndUpdate({_id}, {name}, {new: true})
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        await Category.findOneAndDelete({_id})
        res.status(200).send({success: true, data: true})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

module.exports = router
