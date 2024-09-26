const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true,'product must no be null']
    },
    price:{
        type: Number,
        require:[true, 'product must no be null']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating:{
        type:Number,
        default: 4.8
    },

    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum:{
            values: ['ikea', 'marcos', 'liddy', 'caressa'],
            message:'{VALUE} is not supported' 
        }
    },
})

module.exports = mongoose.model('Products', productsSchema)