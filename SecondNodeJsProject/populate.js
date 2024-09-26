require('dotenv').config()

const connectDB = require('./db/connect')

const Products = require('./models/productmodels')

const jsonProducts = require('./products.json')


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        Products.deleteMany()
        Products.create(jsonProducts)
        console.log("Successfully Connected")
    } catch (error) {
        console.log(error)
    }
}

start()