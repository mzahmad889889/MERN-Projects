const express = require('express');
const task = require('./router/Taskrouter')
const app = express()
const notFound = require('./middleware/taskmiddle')
const errorHandler = require('./middleware/errorhandler')
const connectDB  = require('./db/connect')
require('dotenv').config()

app.get('/hello', (req, res) => {
    res.send('Hello world')
})

app.use(express.json())

app.use('/api/v1', task);

app.use(notFound)

app.use(errorHandler)

const port = 9000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {console.log(`server is runing on port ${port}`)})
    } catch (error) {
        console.log("Database not connected successfully", error)
    }

}

start()