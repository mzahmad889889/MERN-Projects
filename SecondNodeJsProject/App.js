const express = require('express');
require('express-async-errors')
const productrouter = require('./router/productsrouter')
const app = express()
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorhandler')
const connectDB  = require('./db/connect')
require('dotenv').config()

// app.get('/', (req, res) => {
//     res.send('<h1>Store API</h1><a href="/api/v1/products">Products API</a>')
// })

app.use(express.json())

app.use('/', productrouter);

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {console.log(`server is runing on port ${port}`)})
    } catch (error) {
        console.log("Database not connected successfully", error)
    }

}

start()