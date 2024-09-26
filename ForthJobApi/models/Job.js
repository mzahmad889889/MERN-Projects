const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true, "Please Provide Company Name"],
        maxLength: 50
    },
    position:{
        type:String,
        required:[true, "Please Provide positions"],
        maxLength: 100
    },
    status:{
        type:String,
        enum:["pending", "interview", "cancelled"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model("Job", jobSchema)