const mongoose = require('mongoose')
//require('dotenv').config()

const todosSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'categories'}]
    },
    {versionKey: false}
)
todosSchema.pre('findOne', function() {
    this.populate('user').populate('categories')
})
todosSchema.pre('find', function() {
    this.populate('user').populate('categories')
})
todosSchema.pre('findOneAndUpdate', function() {
    this.populate('user').populate('categories')
})
todosSchema.post('save', function(doc, next) {
    doc.populate('categories')
        .populate('user')
        .execPopulate()
        .then(function() {
            next()
        })
})
const Todos = mongoose.model('todos', todosSchema)

module.exports = Todos
