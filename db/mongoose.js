const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
   `mongodb://${process.env.MONGO_PATH}:${process.env.MONGO_PORT}/todos`,
 // process.env.MONGO_PATH,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    err => {
        if (!err) {
            console.log('MongoDB connected!')
        }
    }
)
