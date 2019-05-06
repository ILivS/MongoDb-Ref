const mongoose = require('mongoose')
//require('dotenv').config()

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
        }
    },
    {versionKey: false}
)

categorySchema.pre('find', function() {
    this.populate('user')
})
categorySchema.pre('findOneAndUpdate', function() {
    this.populate('user')
})
categorySchema.post('save', function(doc, next) {
    doc.populate('user')
        .execPopulate()
        .then(function() {
            next()
        })
})
const Category = mongoose.model('categories', categorySchema)

module.exports = Category
