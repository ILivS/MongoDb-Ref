const app = require('./app')

const port = process.env.PORT || 5000
const host = process.env.HOST || '127.0.0.1'
app.listen(port, function() {
    console.log(`Started on PORT ${port} on HOST ${host}`)
})
