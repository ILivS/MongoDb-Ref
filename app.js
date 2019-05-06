const express = require('express')
var bodyParser = require('body-parser')
require('./db/mongoose')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const TodosRoute = require('./routes/todos')
const CategoryRoute = require('./routes/categories')
const AuthRoute = require('./routes/auth')

app.use(express.json())
app.use('/', AuthRoute)
app.use('/todos', TodosRoute)
app.use('/categories', CategoryRoute)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use((req, res, next) => {
    const error = new Error('Page not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
