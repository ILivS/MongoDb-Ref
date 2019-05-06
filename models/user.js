const mongoose = require('mongoose')
//require('dotenv').config()

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    },
    {versionKey: false}
)

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

const User = mongoose.model('users', userSchema)

module.exports = User
